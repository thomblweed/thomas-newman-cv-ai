import '@tanstack/react-start/server-only';

import { getRoles } from '../../../server/cv/roles.server';

import { rolesToolDefinition, rolesToolInputSchema } from './definition';

export const rolesToolServer = rolesToolDefinition.server(
  async (args: unknown) => {
    const input = rolesToolInputSchema.parse(args);
    return await getRoles({
      startDate: input.startDate,
      endDate: input.endDate,
      months: input.months
    });
  }
);
