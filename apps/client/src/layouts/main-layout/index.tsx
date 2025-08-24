import { Outlet } from '@tanstack/react-router';
import { BackgroundImage } from './components/background-image';
import { Footer } from './components/footer';
import { Header } from './components/header';

export const MainLayout = () => {
  return (
    <>
      <BackgroundImage />
      <div className="grid grid-rows-[auto_1fr_auto] h-[100dvh]">
        <Header />
        <main className="my-4">
          <Outlet />
        </main>
        <Footer footerText="thomas newman" />
      </div>
    </>
  );
};
