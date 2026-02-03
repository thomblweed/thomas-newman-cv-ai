import { createFileRoute } from '@tanstack/react-router';
import { Chat } from '@/ui/chat';

export const Route = createFileRoute('/_rootLayout/')({
  component: RootPage
});

function RootPage() {
  return <Chat />;
}
