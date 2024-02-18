import { createRootRoute, Outlet } from '@tanstack/react-router';
import '../index.css';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center justify-between relative">
      <Header />
      <div className="flex-grow p-5 w-full max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});
