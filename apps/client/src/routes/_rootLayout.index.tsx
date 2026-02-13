import { createFileRoute } from '@tanstack/react-router';

import { Chat } from '@/features/chat/ui';

export const Route = createFileRoute('/_rootLayout/')({
  component: RootPage
});

function RootPage() {
  return <Chat />;
}
