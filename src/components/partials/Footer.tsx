import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

function Footer() {
  return (
    <footer className="w-full bg-stone-300 p-10 flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-y-5 md:gap-0 md:flex-row justify-between">
        <div>
          <p className="text-2xl">
            <span className="">SHOP</span>. ©2024
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Информация</p>
          <Link to="/policy" className="font-normal text-2xl">
            Политика конфиденциальности
          </Link>
          <Link to="/offer" className="font-normal text-2xl">
            Публичная оферта
          </Link>
          <Link to="/agreement" className="font-normal text-2xl">
            Пользовательское соглашение
          </Link>
        </div>
        <div className="flex flex-col  items-start md:items-center gap-y-2">
          <p>Контакты</p>
          <p className="font-medium text-2xl">+7(123)-456-78-90</p>
          <p className="font-medium text-2xl">sneakers@shop.ru</p>
          <div>
            <Button asChild variant={'link'}>
              <a href="https://vk.com">ВКонтакте</a>
            </Button>
            <Button asChild variant={'link'}>
              <a href="https://instagram.com">Instagram</a>
            </Button>
            <Button asChild variant={'link'}>
              <a href="https://facebook.com">Facebook</a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
