import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { useStore } from '@/store/store';

function Header() {
  const isUserValid = useStore((state) => state.isValid);

  return (
    <header className="p-10 flex justify-between items-center max-w-7xl w-full mx-auto">
      <Link to="/" className="font-bold text-3xl uppercase tracking-widest flex items-end">
        shop
        <span className="w-2 h-2 bg-red-600 -translate-y-1"></span>
      </Link>

      <div className="flex gap-5 items-center">
        <Button variant={'link'}>
          <Link to="/sneakers" className="font-medium uppercase">
            Кроссовки
          </Link>
        </Button>
        <Button variant={'link'}>
          <Link to="/about" className="font-medium uppercase">
            О нас
          </Link>
        </Button>
        <span className="h-8 border-l border-gray-500"></span>
        {isUserValid ? (
          <>
            <Link to="/">
              <span className="material-symbols-outlined">favorite</span>
            </Link>
            <Link to="/">
              <span className="material-symbols-outlined">shopping_bag</span>
            </Link>
            <Link to="/profile">
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
