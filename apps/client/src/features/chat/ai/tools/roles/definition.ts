import { toolDefinition } from '@tanstack/ai';
import z from 'zod';

export const rolesToolInputSchema = z.object({
  startDate: z.string().optional().describe('Start date in YYYY-MM format'),
  endDate: z.string().optional().describe('End date in YYYY-MM format'),
  months: z
    .number()
    .optional()
    .describe('Number of months to look back from today'),
  company: z
    .string()
    .optional()
    .describe(
      'Free-text company or client name to narrow the roles to, matched case-insensitively against both. Use it when the question is about one company or project, e.g. "what did you do at Slice?" → {"company": "Slice"}'
    ),
  sections: z
    .array(z.enum(['tech', 'responsibilities', 'achievements']))
    .optional()
    .describe(
      'Which parts of the answer the question is about, controlling the answer card the interface renders: "tech" for the tech stack, "responsibilities" for what was done, "achievements" for outcomes, or any combination. E.g. "what tech did you use at Slice?" → ["tech"], "what did you achieve at Ensono?" → ["achievements"]. Omit for a career overview; pass [] only when a question needs the tool but should render no card. It never changes what the tool returns.'
    )
});

export const rolesToolDefinition = toolDefinition({
  name: 'get_roles',
  description:
    "Get Thomas Newman's professional roles and work experience, including company, client, title, period, responsibilities, achievements, and tech stack. Pass `company` to narrow to one company or client, and `sections` to say which parts of the answer the question is about.",
  inputSchema: rolesToolInputSchema,
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
