import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { useStore } from '@/store/store';
import { SheetTrigger } from '../ui/sheet';

function Header() {
  const { isValid, cartItems } = useStore((state) => state);

  const cartTotalAmount = cartItems?.length || 0;

  return (
    <header className="px-5 py-6 flex flex-col gap-y-5 items-start md:flex-row justify-between md:items-center max-w-7xl w-full mx-auto sticky bg-[#f3f3f3] z-10 top-0">
      <Link to="/" className="font-bold text-3xl uppercase tracking-widest flex items-end">
        shop
        <span className="w-2 h-2 bg-red-600 -translate-y-1"></span>
      </Link>

      <div className="w-full flex justify-between gap-5 items-center sm:w-fit">
        <Button className='p-0' asChild variant={'link'}>
          <Link to="/sneakers" className="font-medium uppercase">
            Кроссовки
          </Link>
        </Button>

        <span className="h-8 border-l border-gray-500"></span>
        {isValid ? (
          <>
            <Link to="/favourites" className="flex">
              <span className="material-symbols-outlined">favorite</span>
            </Link>
            <SheetTrigger className="flex">
              <span className="material-symbols-outlined">shopping_bag</span>
              <p className="font-bold text-red-500">{cartTotalAmount}</p>
            </SheetTrigger>

            <Link to="/profile" className="flex">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </>
        ) : (
          <>
            <Button variant={'link'}>
              <Link to="/auth/signin">Вход</Link>
            </Button>
            <Button variant={'link'}>
              <Link to="/auth/signup">Регистрация</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
