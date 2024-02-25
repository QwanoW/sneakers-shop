import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { SneakerCard } from '@/components/skeletons/SneakerCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/hooks/useDebounce';
import { getAllSneakers } from '@/lib/pocketbase';
import { useStore } from '@/store/store';
import { createFileRoute } from '@tanstack/react-router';
import { RecordModel } from 'pocketbase';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute('/sneakers/')({
  component: Sneakers,
});

function Sneakers() {
  const [showFilters, setShowFilters] = useState(false);
  const categories = useStore((state) => state.categories);

  const [isLoading, setIsLoading] = useState(true);
  const [sneakers, setSneakers] = useState<RecordModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gendersFilter, setGendersFilter] = useState<string[]>([]);
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchQuery);

  const fetchSneakers = useCallback(async () => {
    try {
      setIsLoading(true);
      const resp = await getAllSneakers(debouncedSearch, gendersFilter, categoriesFilter);
      setSneakers(resp.items);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sneakers:', error);
    }
  }, [debouncedSearch, gendersFilter, categoriesFilter]);

  useEffect(() => {
    fetchSneakers();
  }, [fetchSneakers]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    [setSearchQuery],
  );

  return (
    <div className="py-10 space-y-10">
      <h1 className="text-3xl font-bold">Все кроссовки</h1>
      <div className="flex flex-col gap-y-4 sm:flex-row items-start justify-between">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Поиск"
            className="border border-gray-300 rounded px-4 py-2 mr-2 w-64"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && <h2 className="font-bold">Поиск: {searchQuery}</h2>}
        </div>
        <Button onClick={() => setShowFilters((state) => !state)}>Показать фильтры</Button>
      </div>
      {showFilters && (
        <div className="w-full flex flex-col sm:flex-row gap-x-20 gap-y-10 bg-white p-5 rounded-lg">
          <div className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-medium">Сезон</h3>
            <div className="flex flex-col gap-y-2">
              {categories &&
                categories.map((item) => (
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      value={item.id}
                      key={item.id}
                      checked={categoriesFilter.includes(item.id)}
                      onCheckedChange={() =>
                        setCategoriesFilter((state) =>
                          state.includes(item.id)
                            ? state.filter((cat) => cat !== item.id)
                            : [...state, item.id],
                        )
                      }
                    />
                    <Label className="font-normal text-lg" htmlFor="terms">
                      {item.category}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-medium">Пол</h3>
            <div className="flex flex-col gap-y-2">
              {['мужской', 'женский'].map((gender, index) => (
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    value={gender}
                    key={index}
                    checked={gendersFilter.includes(gender)}
                    onCheckedChange={() =>
                      setGendersFilter((prevGender) =>
                        prevGender.includes(gender)
                          ? prevGender.filter((g) => g !== gender)
                          : [...prevGender, gender],
                      )
                    }
                  />
                  <Label className="font-normal text-lg" htmlFor="terms">
                    {gender}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {sneakers.length === 0 && !isLoading && <p className='text-2xl text-center'>Ничего не найдено... 😔</p>}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => {
              return <SkeletonCard key={index} />;
            })
          : sneakers.map(({ id, title, type, price, field, collectionName }) => (
              <SneakerCard key={id} {...{ id, title, type, price, field, collectionName }} />
            ))}
      </div>
    </div>
  );
}
