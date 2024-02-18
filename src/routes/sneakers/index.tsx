import { SkeletonCard } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { constructImageURL } from '@/lib/helpers';
import { getAllSneakers } from '@/lib/pocketbase';
import { Link, createFileRoute } from '@tanstack/react-router';
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/sneakers/')({
  component: Sneakers,
});

function Sneakers() {
  const [sneakers, setSneakers] = useState<RecordModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await getAllSneakers();
      setSneakers(resp.items);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold py-10">Все кроссовки</h1>
      <Button variant={'default'}>Показать фильтры</Button>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          : Array.from({ length: 6 }).map((_, index) => {
              return <SkeletonCard key={index} />;
            })}
      </div>
    </div>
  );
}
