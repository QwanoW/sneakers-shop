import { Button } from '@/components/ui/button';
import { constructImageURL } from '@/lib/utils';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { getCartItem } from '@/store/store';
import { getSneakerByID } from '@/lib/pocketbase';
import { RecordModel } from 'pocketbase';
import { SelectSize } from '@/components/selectSize';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useCart from '@/hooks/useCart';
import useFavourite from '@/hooks/useFavourite';

export const Route = createLazyFileRoute('/sneakers/$sneakerid')({
  component: SneakerItem,
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(price);
};

function SneakerItem() {
  const { sneakerid } = Route.useParams();
  const navigate = useNavigate({ from: '/sneakers/$sneakerid' });

  if (!sneakerid) {
    navigate({ to: '/' });
  }

  const cartItem = getCartItem(sneakerid);

  const sizes = useMemo(() => [36, 37, 38, 39, 40, 41, 42, 43, 44, 45], []);
  const [sneaker, setSneaker] = useState<RecordModel | null>(null);
  const [selectedSize, setSelectedSize] = useState(cartItem?.size || 36);

  const { isInCart, handleCartClick, isLoading } = useCart(sneakerid);
  const { isFavourite, handleFavouriteClick } = useFavourite(sneakerid);

  const handleSelectSize = useCallback((size: number) => setSelectedSize(size), []);

  useEffect(() => {
    async function fetchData() {
      const resp = await getSneakerByID(sneakerid);
      const cartItem = getCartItem(sneakerid);
      if (cartItem) {
        setSelectedSize(cartItem.size);
      }
      setSneaker(resp);
    }
    fetchData();
  }, [sneakerid, sizes]);

  if (!sneaker) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2">
        <img
          className="w-full object-cover bg-stone-200"
          src={sneaker?.field ? constructImageURL(sneaker?.field, 'sneakers', sneaker?.id) : ''}
          alt={sneaker?.title}
        />
      </div>

      <div className="w-full md:w-1/2 p-5 space-y-8">
        <h1 className="text-5xl font-semibold">
          {sneaker?.type} {sneaker?.title}
        </h1>
        <p className="text-3xl text-gray-500">{formatPrice(sneaker?.price)}</p>
        <div className="space-y-6">
          <p className="text-xl">Выберите размер:</p>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <SelectSize
                key={size}
                size={size}
                selectedSize={selectedSize}
                handleSelectSize={handleSelectSize}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-col justify-between gap-3">
          <Button
            variant={isInCart ? 'destructive' : 'default'}
            disabled={isLoading}
            className="rounded-none p-7"
            onClick={() => handleCartClick(selectedSize)}>
            {isInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
          </Button>
          <Button
            variant={isFavourite ? 'secondary' : 'default'}
            className="rounded-none border border-stone-300 p-7"
            onClick={handleFavouriteClick}>
            {isFavourite ? 'Убрать из избранного' : 'Добавить в избранное'}
          </Button>
        </div>
        <h2 className="font-bold text-3xl">Описание</h2>
        <p className="text-lg">{sneaker?.description}</p>
      </div>
    </div>
  );
}
