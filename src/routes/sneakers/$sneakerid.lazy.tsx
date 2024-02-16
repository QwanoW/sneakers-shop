import { constructImageURL } from '@/lib/helpers';
import { getSneakerByID } from '@/lib/pocketbase';
import { Sneaker } from '@/types';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

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
  const [sneaker, setSneaker] = useState<Sneaker | null>(null);
  const { sneakerid } = Route.useParams();

  useEffect(() => {
    async function fetchData() {
      const resp = await getSneakerByID(sneakerid);
      setSneaker(resp as unknown as Sneaker);
    }
    fetchData();
  }, [sneakerid]);

  return (
    <div className="flex rounded overflow-hidden shadow-lg bg-white">
      <div className="flex-grow flex flex-col justify-between px-6 py-10">
        <div className="font-bold text-2xl mb-2">{sneaker?.title}</div>
        <p className="text-gray-700 text-base">{sneaker?.description}</p>
        <div className="mt-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {sneaker?.expand.brand.title}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {sneaker?.expand.category.category}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {sneaker?.gender}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-3xl font-bold text-red-600">
            {sneaker ? formatPrice(sneaker?.price) : null}
          </span>
          <span className="text-xl font-bold line-through text-gray-400">
            {sneaker ? formatPrice(sneaker?.past_price) : null}
          </span>
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Купить
          </button>
          <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded ml-4">
            В избранное
          </button>
        </div>
      </div>
      <img
        className="w-1/2 object-cover"
        src={sneaker?.field ? constructImageURL(sneaker?.field, 'sneakers', sneaker?.id) : ''}
        alt={sneaker?.title}
      />
    </div>
  );
}
