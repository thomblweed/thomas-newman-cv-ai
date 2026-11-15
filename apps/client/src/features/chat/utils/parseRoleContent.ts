export interface AnswerRowData {
  title: string;
  detail: string;
}

export interface ParsedRoleContent {
  responsibilities: AnswerRowData[];
  achievements: AnswerRowData[];
}

const sectionHeading = /^## /m;
const rowHeading = /^### /m;

const collectRows = (section: string): AnswerRowData[] =>
  section
    .split(rowHeading)
    .slice(1)
    .map((block) => {
      const [titleLine = '', ...detailLines] = block.split('\n');

      return {
        title: titleLine.trim(),
        detail: detailLines.join('\n').trim()
      };
    })
    .filter((row) => row.title.length > 0);

const findSection = (content: string, heading: string): string | undefined =>
  content
    .split(sectionHeading)
    .find((section) => section.split('\n')[0]?.trim() === heading);

// Keyed by the role markdown body, which comes from a small fixed set of CV files.
const cache = new Map<string, ParsedRoleContent>();

export const parseRoleContent = (content: string): ParsedRoleContent => {
  const cached = cache.get(content);

  if (cached) return cached;

  const responsibilities = findSection(content, 'Responsibilities');
  const achievements = findSection(content, 'Key Achievements');

  const parsed: ParsedRoleContent = {
    responsibilities: responsibilities ? collectRows(responsibilities) : [],
    achievements: achievements ? collectRows(achievements) : []
  };

  cache.set(content, parsed);

  return parsed;
};
