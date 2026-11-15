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
  tech: z
    .array(z.string())
    .optional()
    .describe(
      'Technologies to narrow the roles to, matched case-insensitively against each role tech stack, e.g. "have you used Java?" → ["java"], "React or Angular?" → ["react", "angular"]. A role matches when it has ANY of the listed technologies. Use the slugs already in the CV tech vocabulary (java, spring-boot, react, typescript, ...). A list matching nothing returns no roles.'
    ),
  industry: z
    .array(z.string())
    .optional()
    .describe(
      'Industries to narrow the roles to, matched case-insensitively against each role industry, e.g. "have you worked in payments?" → ["payments"], "health or pensions?" → ["health-tech", "pensions"]. A role matches when it has ANY of the listed industries. A list matching nothing returns no roles.'
    ),
  employmentType: z
    .enum(['consulting', 'full-time'])
    .optional()
    .describe(
      'Working arrangement to narrow the roles to: "consulting" for client engagements, "full-time" for permanent roles. Use it for e.g. "what consulting work have you done?" → "consulting".'
    ),
  sections: z
    .array(z.enum(['tech', 'responsibilities', 'achievements', 'period']))
    .optional()
    .describe(
      'Which parts of the answer the question is about, emphasising them on the answer card the interface renders: "tech" for the tech stack, "responsibilities" for what was done, "achievements" for outcomes, "period" for the timeline. E.g. "what tech did you use at Slice?" → ["tech"], "what did you achieve at Ensono?" → ["achievements"], "when did you work at Slice?" → ["period"]. Omit for a career overview; pass [] only when a question needs the tool but should render no card. It never changes what the tool returns or the card form.'
    )
});

export const rolesToolDefinition = toolDefinition({
  name: 'get_roles',
  description:
    "Get Thomas Newman's professional roles and work experience, including company, client, title, period, responsibilities, achievements, and tech stack. Narrow the result to the roles a question is about with `company` (a company or client), `tech` (technologies, any of), `industry` (industries, any of), `employmentType` (consulting or full-time) and the date filters. Pass `sections` to say which parts of the answer the question is about; it does not change what the tool returns.",
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
