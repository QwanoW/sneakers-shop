import { SkeletonCard } from '@/components/SkeletonCard';
import { SneakerCard } from '@/components/SneakerCard';
import { Button } from '@/components/ui/button';
import { getAllSneakers } from '@/lib/pocketbase';
import { createFileRoute } from '@tanstack/react-router';
import { RecordModel } from 'pocketbase';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute('/sneakers/')({
  component: Sneakers,
});

function Sneakers() {
  const [sneakers, setSneakers] = useState<RecordModel[]>([]);

  const fetchData = useCallback(async () => {
    const resp = await getAllSneakers();
    setSneakers(resp.items);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1 className="text-3xl font-bold py-10">Все кроссовки</h1>
      <Button variant={'default'}>Показать фильтры</Button>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sneakers.length > 0
          ? sneakers.map(({ id, title, type, price, field, collectionName }) => (
              <SneakerCard key={id} {...{ id, title, type, price, field, collectionName }} />
            ))
          : Array.from({ length: 6 }).map((_, index) => {
              return <SkeletonCard key={index} />;
            })}
      </div>
    </div>
  );
}
