import fs from 'node:fs/promises';
import path from 'node:path';

import { readMarkdownFile } from '../markdown/markdown.server';

interface Role {
  type: string;
  company: string;
  client?: string;
  title: string;
  period_start: string;
  period_end?: string;
  duration_months: number;
  employment_type: string;
  end_reason?: string;
  industry?: string;
  ownership?: string;
  tags?: Array<string>;
  seniority?: string;
  responsibilities_count?: number;
  achievements_count?: number;
  promotion?: string;
  tech_stack?: Array<string>;
  content: string;
}

interface GetRolesOptions {
  startDate?: string; // YYYY-MM format, filter roles that overlap with this date or later
  endDate?: string; // YYYY-MM format, filter roles that overlap with this date or earlier
  months?: number; // Filter roles from the past X months (calculated from today)
}

const dataPath = path.join(process.cwd(), 'data/cv/roles');

const isDateInRange = (
  roleStart: string,
  roleEnd: string | undefined,
  filterStart: string | undefined,
  filterEnd: string | undefined
): boolean => {
  // If no filters, include all roles
  if (!filterStart && !filterEnd) return true;

  // Role overlaps with filter range if:
  // - Role starts before or on filter end AND
  // - Role ends after or on filter start (or is ongoing)
  const roleStartDate = roleStart;
  const roleEndDate = roleEnd || '9999-12'; // Treat ongoing roles as ending far in the future

  if (filterStart && roleEndDate < filterStart) return false;
  if (filterEnd && roleStartDate > filterEnd) return false;

  return true;
};

export const getRoles = async (
  options?: GetRolesOptions
): Promise<Array<Role>> => {
  const files = await fs.readdir(dataPath);
  const roleFiles = files.filter((file) => file.endsWith('.md'));

  // Calculate date range if months parameter is provided
  let startDate = options?.startDate;
  let endDate = options?.endDate;

  if (options?.months) {
    const today = new Date();
    const monthsAgo = new Date();
    monthsAgo.setMonth(today.getMonth() - options.months);
    const year = monthsAgo.getFullYear();
    const month = String(monthsAgo.getMonth() + 1).padStart(2, '0');
    startDate = `${year}-${month}`;
    endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  }

  const roles = await Promise.all(
    roleFiles.map(async (file) => {
      const { frontmatter, content } = await readMarkdownFile(`roles/${file}`);

      // Calculate duration_months for ongoing roles
      let durationMonths: number;
      if (
        frontmatter.duration_months === 'ongoing' ||
        !frontmatter.period_end
      ) {
        const start = new Date(frontmatter.period_start);
        const now = new Date();
        durationMonths =
          (now.getFullYear() - start.getFullYear()) * 12 +
          (now.getMonth() - start.getMonth());
      } else {
        durationMonths = Number(frontmatter.duration_months) || 0;
      }

      return {
        type: frontmatter.type,
        company: frontmatter.company,
        client: frontmatter.client,
        title: frontmatter.title,
        period_start: frontmatter.period_start,
        period_end: frontmatter.period_end,
        duration_months: durationMonths,
        employment_type: frontmatter.employment_type,
        end_reason: frontmatter.end_reason,
        industry: frontmatter.industry,
        ownership: frontmatter.ownership,
        tags: frontmatter.tags,
        seniority: frontmatter.seniority,
        responsibilities_count: frontmatter.responsibilities_count
          ? Number(frontmatter.responsibilities_count)
          : undefined,
        achievements_count: frontmatter.achievements_count
          ? Number(frontmatter.achievements_count)
          : undefined,
        promotion: frontmatter.promotion,
        tech_stack: frontmatter.tech_stack,
        content
      };
    })
  );

  // Filter by date range if provided
  const filteredRoles = roles.filter((role) =>
    isDateInRange(role.period_start, role.period_end, startDate, endDate)
  );

  // Sort by period_start descending (most recent first)
  return filteredRoles.sort((a, b) => {
    if (b.period_start < a.period_start) return -1;
    if (b.period_start > a.period_start) return 1;
    return 0;
  });
};
