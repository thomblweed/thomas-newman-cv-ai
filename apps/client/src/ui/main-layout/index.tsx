import { Outlet } from '@tanstack/react-router';

import { BackgroundImage } from './components/background-image';
import { Footer } from './components/footer';
import { Header } from './components/header';

export const MainLayout = () => {
  return (
    <>
      <BackgroundImage />
      <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
        <Header />
        <main className="content-view my-4 flex min-h-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col">
            <Outlet />
          </div>
        </main>
        <Footer footerText="thomas newman" />
      </div>
    </>
  );
};
