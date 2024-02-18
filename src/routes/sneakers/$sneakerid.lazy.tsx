import { SelectSize } from '@/components/selectSize';
import { Button } from '@/components/ui/button';
import { constructImageURL } from '@/lib/helpers';
import { getSneakerByID } from '@/lib/pocketbase';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { RecordModel } from 'pocketbase';
import { useCallback, useEffect, useState } from 'react';

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

  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const [sneaker, setSneaker] = useState<RecordModel | null>(null);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleSelectSize = useCallback((size: number) => setSelectedSize(size), []);

  useEffect(() => {
    async function fetchData() {
      const resp = await getSneakerByID(sneakerid);
      setSneaker(resp);
    }
    fetchData();
  }, [sneakerid]);

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

      <div className="w-full md:w-1/2 p-5 space-y-10">
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
        <div className='flex flex-col sm:flex-col justify-between gap-3'>
          <Button className='rounded-none p-7'>Добавить в корзину</Button>
          <Button variant={'outline'} className='rounded-none p-7'>Добавить в избранное</Button>
        </div>
      </div>
    </div>
  );
}
