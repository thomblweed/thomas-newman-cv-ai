import { Outlet } from '@tanstack/react-router';

import { BackgroundImage } from './components/BackgroundImage';
import { Footer } from './components/Footer';

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
