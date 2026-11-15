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

export const answerHints = [...answerSections, 'period'] as const;

export type AnswerHint = (typeof answerHints)[number];
export type SectionsHint = AnswerHint[];
export type AnswerCardVariant = 'full' | 'compact' | 'list' | 'none';

export interface ResolvedAnswerCard {
  variant: AnswerCardVariant;
  sections: AnswerSection[];
  period: boolean;
}

export interface AnswerCardData {
  roles: Role[];
  sectionsHint: SectionsHint | undefined;
  techFilter: string[];
  variant: AnswerCardVariant;
}

export const parseSectionsHint = (
  argumentsJson: string
): SectionsHint | undefined => {
  try {
    const parsed: unknown = JSON.parse(argumentsJson);

    if (typeof parsed === 'object' && parsed !== null && 'sections' in parsed) {
      const { sections } = parsed as { sections: unknown };

      if (Array.isArray(sections)) {
        return answerHints.filter((hint) => sections.includes(hint));
      }
    }

    return undefined;
  } catch {
    return undefined;
  }
};

export const parseTechFilter = (argumentsJson: string): string[] => {
  try {
    const parsed: unknown = JSON.parse(argumentsJson);

    if (typeof parsed === 'object' && parsed !== null && 'tech' in parsed) {
      const { tech } = parsed as { tech: unknown };

      if (Array.isArray(tech)) {
        return tech
          .filter((slug): slug is string => typeof slug === 'string')
          .map((slug) => slug.toLowerCase());
      }
    }

    return [];
  } catch {
    return [];
  }
};

export const resolveAnswerCardVariant = (
  sectionsHint: SectionsHint | undefined,
  roleCount: number
): AnswerCardVariant => {
  if (sectionsHint?.length === 0) return 'none';
  if (roleCount <= 0) return 'none';
  if (roleCount === 1) return 'full';
  if (roleCount === 2) return 'compact';

  return 'list';
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
  const variant = resolveAnswerCardVariant(sectionsHint, roleCount);

  if (variant === 'none')
    return { variant: 'none', sections: [], period: false };

  const { responsibilities, achievements } = parseRoleContent(role.content);
  const rows = {
    responsibilities: responsibilities.length,
    achievements: achievements.length
  };
  const hintedSections = sectionsHint
    ? answerSections.filter((section) => sectionsHint.includes(section))
    : [...answerSections];
  const sections = hintedSections.filter((section) =>
    roleHasSection(section, role, rows)
  );
  const period = sectionsHint?.includes('period') ?? false;

  if (variant !== 'list' && sections.length === 0 && !period) {
    return { variant: 'none', sections: [], period: false };
  }

  return { variant, sections, period };
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
  const sectionsHint = parseSectionsHint(part.arguments);

  return {
    roles,
    sectionsHint,
    techFilter: parseTechFilter(part.arguments),
    variant: resolveAnswerCardVariant(sectionsHint, roles.length)
  };
};
