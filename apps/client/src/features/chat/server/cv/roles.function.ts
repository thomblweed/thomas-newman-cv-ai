import { createServerFn } from '@tanstack/react-start';

import { getRoles } from './roles.server';

export const getRolesFunction = createServerFn().handler(
  async () => await getRoles()
);
