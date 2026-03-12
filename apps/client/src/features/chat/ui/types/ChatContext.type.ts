import type { UseChatReturn } from '@tanstack/ai-react';
import type { profileToolClient } from '../../ai/tools/profile/client';
import type { rolesToolClient } from '../../ai/tools/roles/client';

export type ChatContextType = UseChatReturn<
  [typeof profileToolClient, typeof rolesToolClient]
>;
