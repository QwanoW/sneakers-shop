import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/toaster';
import Header from '../components/partials/Header';
import Footer from '@/components/partials/Footer';
import '../index.css';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import CartSheetContent from '@/components/cart/CartSheetContent';

export const Route = createRootRoute({
  component: () => (
    <Sheet>
      <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center justify-between relative">
        <Header />
        <div className="flex-grow p-5 w-full max-w-7xl mx-auto">
          <Outlet />
          <Toaster />
        </div>
        <Footer />
      </div>
      <CartSheetContent />
    </Sheet>
  ),
  notFoundComponent: () => (
    <Sheet>
      <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center justify-between relative">
        <Header />
        <div className="flex flex-col justify-center items-center p-5 gap-3 max-w-7xl">
          <h1 className="text-3xl font-bold text-center">404</h1>
          <p className="text-center">Страница не найдена</p>
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        </div>
        <Footer />
      </div>
      <CartSheetContent />
    </Sheet>
  ),
});
