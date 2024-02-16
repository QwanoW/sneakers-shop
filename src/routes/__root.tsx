import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col justify-between">
      <Header />
      <div className='flex-grow p-10 w-full max-w-7xl mx-auto'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <Footer />
    </div>
  ),
});
