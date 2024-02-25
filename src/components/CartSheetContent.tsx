import { useStore } from '@/store/store';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import CartItem from './CartItem';
import { Link } from '@tanstack/react-router';

function CartSheetContent() {
  const cartItems = useStore((state) => state.cartItems);
  const cartItemsTotalPrice = cartItems?.reduce((acc, item) => {
    const price = item.expand?.sneaker?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Ваша корзина</SheetTitle>
        <SheetDescription>
          {cartItems?.length ? `Товаров в корзине: ${cartItems.length}` : 'Корзина пуста'}
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-5 h-full justify-between">
        <div className="flex flex-col h-full gap-3 py-10 overflow-y-scroll">
          {cartItems?.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
        <div className="w-full flex flex-col gap-5">
          <p>
            Итого: <span className="font-medium">{cartItemsTotalPrice} ₽</span>
          </p>
          <Link to="/orders/create">
            <SheetTrigger className="w-full">
              <button className="w-full text-white bg-red-400 hover:bg-red-600 rounded-none py-5 px-7 mb-14 transition">
                Оформить заказ
              </button>
            </SheetTrigger>
          </Link>
        </div>
      </div>
    </SheetContent>
  );
}

export default CartSheetContent;
