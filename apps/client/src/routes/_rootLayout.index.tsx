import { createFileRoute } from '@tanstack/react-router';
import { getProfileFunction } from '@/server/cv/profile.function';
import { Profile } from '@/ui/test/Profile';

export const Route = createFileRoute('/_rootLayout/')({
  component: RootPage,
  loader: async () => await getProfileFunction()
});

function RootPage() {
  return <Profile />;
}
