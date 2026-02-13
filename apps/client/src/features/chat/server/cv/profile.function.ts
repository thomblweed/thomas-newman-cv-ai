import { createServerFn } from '@tanstack/react-start';

import { getProfile } from './profile.server';

export const getProfileFunction = createServerFn().handler(
  async () => await getProfile()
);
