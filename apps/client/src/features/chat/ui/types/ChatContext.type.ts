import type { UseChatReturn } from '@tanstack/ai-react';
import type { profileToolClient } from '../tools/profileTool';
import type { rolesToolClient } from '../tools/rolesTool';

export type ChatContextType = UseChatReturn<
  [typeof profileToolClient, typeof rolesToolClient]
>;
