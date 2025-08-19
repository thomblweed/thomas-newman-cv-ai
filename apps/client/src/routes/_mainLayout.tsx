import { Outlet, createFileRoute } from '@tanstack/react-router';
import { BackgroundImage } from '@/features/background-image/ui/BackGroundImage';

export const Route = createFileRoute('/_mainLayout')({
  component: MainLayout
});

function MainLayout() {
  return (
    <>
      <BackgroundImage />
      <main className="my-4">
        <Outlet />
      </main>
    </>
  );
}
