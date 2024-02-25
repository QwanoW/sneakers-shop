import { createLazyFileRoute } from '@tanstack/react-router';
import { SneakerCard } from '@/components/SneakerCard';
import { useStore } from '@/store/store';
import empty_favourites from '@/assets/img/empty_favourites.png';

export const Route = createLazyFileRoute('/favourites')({
  component: Favourites,
});

export function Favourites() {
  const favourites = useStore((state) => state.favourites);
  return (
    <div>
      <h1 className="py-14 font-bold text-4xl">Мои избранные</h1>
      {favourites && favourites.length ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favourites
            .sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())
            .map((fav) => {
              if (fav.expand) {
                const { id, title, type, price, field, collectionName } = fav.expand.sneaker;
                return (
                  <SneakerCard key={id} {...{ id, title, type, price, field, collectionName }} />
                );
              }
            })}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img className="w-full max-w-96" src={empty_favourites} alt="No favourites" />
          <p className="text-2xl sm:w-1/2 text-center font-medium">
            В ваших избранных пусто, добавьте что-нибудь 🥺
          </p>
        </div>
      )}
    </div>
  );
}
