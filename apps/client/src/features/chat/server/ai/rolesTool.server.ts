import { getRoles } from '../cv/roles.server';
import { rolesToolDefinition, inputSchema } from '../../ai/tools/getRolesTool';

export const getRolesToolServer = rolesToolDefinition.server(
  async (args: unknown) => {
    const input = inputSchema.parse(args);
    return await getRoles({
      startDate: input.startDate,
      endDate: input.endDate,
      months: input.months
    });
  }
);
