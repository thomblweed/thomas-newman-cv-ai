import { Outlet, createFileRoute } from '@tanstack/react-router';
import { BackgroundImage } from '@/features/background-image/ui/BackGroundImage';

export const Route = createFileRoute('/_mainLayout')({
  component: MainLayout
});

function MainLayout() {
  console.log('MainLayout');
  return (
    <>
      <BackgroundImage />
      <main className="">
        <Outlet />
      </main>
    </>
  );
}
