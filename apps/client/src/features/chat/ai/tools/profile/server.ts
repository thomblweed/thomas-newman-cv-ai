import '@tanstack/react-start/server-only';

import { getProfile } from '../../../server/cv/profile.server';

import { profileToolDefinition } from './definition';

export const profileToolServer = profileToolDefinition.server(
  async () => await getProfile()
);
