import { constructImageURL } from '@/lib/helpers';
import { getAllSneakers } from '@/lib/pocketbase';
import { Sneaker } from '@/types';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/sneakers/')({
  component: Sneakers,
});

function Sneakers() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await getAllSneakers();
      setSneakers(resp.items as unknown as Sneaker[]);
    }
    fetchData();
  }, []);

  console.log(sneakers);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold py-10">Все кроссовки</h1>
      </div>
      <div className="w-full grid grid-cols-4 gap-4">
        {sneakers.length > 0
          ? sneakers.map((sneaker) => {
              return (
                <Link
                  key={sneaker.id}
                  to={`/sneakers/$sneakerid`}
                  params={{ sneakerid: sneaker.id }}>
                  <div
                    key={sneaker.id}
                    className="border p-4 shadow-lg hover:shadow-2xl  transition">
                    <img
                      src={constructImageURL(sneaker.field, sneaker.collectionName, sneaker.id)}
                      alt={sneaker.title}
                    />
                    <h2 className="text-xl font-bold">{sneaker.title}</h2>
                    {sneaker.past_price !== 0 ? (
                      <div>
                        <span className="line-through text-gray-500">{sneaker.past_price}</span>
                        <span className="text-red-500 ml-2">{sneaker.price} ₽</span>
                      </div>
                    ) : (
                      <div>{sneaker.price} ₽</div>
                    )}
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}
