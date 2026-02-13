import type { UseChatReturn } from '@tanstack/ai-react';
import type { profileToolClient } from '../../ai/tools/getProfileTool';
import type { rolesToolClient } from '../../ai/tools/getRolesTool';

export type ChatContextType = UseChatReturn<
  [typeof profileToolClient, typeof rolesToolClient]
>;
