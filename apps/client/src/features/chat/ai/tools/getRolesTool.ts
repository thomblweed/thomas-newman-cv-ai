import { toolDefinition } from '@tanstack/ai';
import z from 'zod';

import { getRoles } from '../../server/cv/roles.server';

const inputSchema = z.object({
  startDate: z.string().optional().describe('Start date in YYYY-MM format'),
  endDate: z.string().optional().describe('End date in YYYY-MM format'),
  months: z
    .number()
    .optional()
    .describe('Number of months to look back from today')
});

export const rolesToolDefinition = toolDefinition({
  name: 'get_roles',
  description:
    "Get Thomas Newman's professional roles and work experience, including company, client, title, period, responsibilities, achievements, and tech stack.",
  inputSchema,
  outputSchema: z.array(
    z.object({
      type: z.string(),
      company: z.string(),
      client: z.string().optional(),
      title: z.string(),
      period_start: z.string(),
      period_end: z.string().optional(),
      duration_months: z.number(),
      employment_type: z.string(),
      end_reason: z.string().optional(),
      industry: z.string().optional(),
      ownership: z.string().optional(),
      tags: z.array(z.string()).optional(),
      seniority: z.string().optional(),
      responsibilities_count: z.number().optional(),
      achievements_count: z.number().optional(),
      promotion: z.string().optional(),
      tech_stack: z.array(z.string()).optional(),
      content: z.string()
    })
  ),
  needsApproval: false
});

export const rolesToolServer = rolesToolDefinition.server(
  async (args: unknown) => {
    const input = inputSchema.parse(args);
    return await getRoles({
      startDate: input.startDate,
      endDate: input.endDate,
      months: input.months
    });
  }
);

export const rolesToolClient = rolesToolDefinition.client();
