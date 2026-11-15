import { parseRoleContent } from '../../utils/parseRoleContent';

import type { ChatContextType } from '../types/ChatContext.type';
import type { Role } from '../../interfaces/role.interface';

type MessagePart = ChatContextType['messages'][number]['parts'][number];

export const answerSections = [
  'tech',
  'responsibilities',
  'achievements'
] as const;

export type AnswerSection = (typeof answerSections)[number];
export type SectionsHint = AnswerSection[];
export type AnswerCardVariant = 'full' | 'compact' | 'none';

export interface ResolvedAnswerCard {
  variant: AnswerCardVariant;
  sections: AnswerSection[];
}

export interface AnswerCardData {
  roles: Role[];
  sectionsHint: SectionsHint | undefined;
}

export const parseSectionsHint = (
  argumentsJson: string
): SectionsHint | undefined => {
  try {
    const parsed: unknown = JSON.parse(argumentsJson);

    if (typeof parsed === 'object' && parsed !== null && 'sections' in parsed) {
      const { sections } = parsed as { sections: unknown };

      if (Array.isArray(sections)) {
        return answerSections.filter((section) => sections.includes(section));
      }
    }

    return undefined;
  } catch {
    return undefined;
  }
};

const roleHasSection = (
  section: AnswerSection,
  role: Role,
  rows: { responsibilities: number; achievements: number }
): boolean => {
  if (section === 'tech') return (role.tech_stack?.length ?? 0) > 0;
  if (section === 'responsibilities') return rows.responsibilities > 0;
  return rows.achievements > 0;
};

export const resolveAnswerCard = (
  role: Role,
  sectionsHint: SectionsHint | undefined,
  roleCount: number
): ResolvedAnswerCard => {
  if (sectionsHint?.length === 0) return { variant: 'none', sections: [] };
  if (!sectionsHint && roleCount <= 0) return { variant: 'none', sections: [] };

  const { responsibilities, achievements } = parseRoleContent(role.content);
  const rows = {
    responsibilities: responsibilities.length,
    achievements: achievements.length
  };
  const sections = (sectionsHint ?? [...answerSections]).filter((section) =>
    roleHasSection(section, role, rows)
  );

  if (sections.length === 0) return { variant: 'none', sections: [] };

  const variant: AnswerCardVariant =
    sectionsHint !== undefined || roleCount === 1 ? 'full' : 'compact';

  return { variant, sections };
};

export const getAnswerCardData = (part: MessagePart): AnswerCardData | null => {
  if (
    part.type !== 'tool-call' ||
    part.name !== 'get_roles' ||
    part.state !== 'complete'
  ) {
    return null;
  }

  const roles = Array.isArray(part.output) ? (part.output as Role[]) : [];

  return { roles, sectionsHint: parseSectionsHint(part.arguments) };
};
