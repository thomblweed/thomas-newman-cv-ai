import { createFileRoute } from '@tanstack/react-router';
import { getProfileFunction } from '@/server/cv/profile.function';

export const Route = createFileRoute('/_rootLayout/')({
  component: RootPage,
  loader: async () => await getProfileFunction()
});

function RootPage() {
  return <div>RootPage</div>;
}
