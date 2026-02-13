import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/ui/main-layout';

export const Route = createFileRoute('/_rootLayout')({
  component: RootLayout
});

function RootLayout() {
  return <MainLayout />;
}
