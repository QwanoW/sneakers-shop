import { constructImageURL } from '@/lib/utils';
import { RecordModel } from 'pocketbase';
import { Separator } from './ui/separator';
import useCartItemQuantity from '@/hooks/useCartItemQuantity';
import useCart from '@/hooks/useCart';

function CartItem({ item }: { item: RecordModel }) {
  const { handleCartClick } = useCart(item?.expand?.sneaker.id);
  const alterCartItemQuantity = useCartItemQuantity(
    item.id,
    item?.expand?.sneaker.id,
    item.quantity,
  );

  return (
    <div key={item.id} className=" border border-stone-300 p-3 rounded-lg">
      <div className="flex justify-between gap-5 items-center">
        <img
          className="w-20"
          src={constructImageURL(
            item?.expand?.sneaker.field,
            item?.expand?.sneaker.collectionId,
            item?.expand?.sneaker.id,
          )}
          alt=""
        />
        <div className="w-full flex flex-col gap-1">
          <p className="font-normal">{item?.expand?.sneaker.title}</p>
          <p className="font-normal text-sm text-gray-600">{item.size} размер</p>
          <p className="font-medium">{item?.expand?.sneaker.price} ₽</p>
        </div>
        <span
          onClick={() => handleCartClick(item.size, item.quantity)}
          className="material-symbols-outlined cursor-pointer">
          close
        </span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between gap-5 items-center">
        <span
          onClick={() => alterCartItemQuantity(item.quantity - 1)}
          className="material-symbols-outlined cursor-pointer select-none text-red-500">
          remove
        </span>
        <p>{item.quantity}</p>
        <span
          onClick={() => alterCartItemQuantity(item.quantity + 1)}
          className="material-symbols-outlined cursor-pointer select-none text-green-500">
          add
        </span>
      </div>
    </div>
  );
}

export default CartItem;
