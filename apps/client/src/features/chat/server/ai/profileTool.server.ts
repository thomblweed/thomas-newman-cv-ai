import { getProfile } from '../cv/profile.server';
import { profileToolDefinition } from '../../ai/tools/getProfileTool';

export const getProfileToolServer = profileToolDefinition.server(
  async () => await getProfile()
);
