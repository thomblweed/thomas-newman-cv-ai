import { Outlet } from '@tanstack/react-router';

import { BackgroundImage } from './components/background-image';
import { Footer } from './components/footer';

export const MainLayout = () => {
  return (
    <>
      <BackgroundImage />
      <div className="grid grid-rows-[1fr_auto] h-[100dvh]">
        <main className="my-4">
          <Outlet />
        </main>
        <Footer footerText="Thomas Newman" />
      </div>
    </>
  );
};
