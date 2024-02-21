import { constructImageURL } from '@/lib/helpers';
import { addToFavouritesCollection, deleteFromFavouritesCollection } from '@/lib/pocketbase';
import { useStore } from '@/store/store';
import { Link, useNavigate } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { FC, memo } from 'react';
import { useToast } from './ui/use-toast';

interface SneakerCardProps {
  id: string;
  title: string;
  type: string;
  price: number;
  field: string;
  collectionName: string;
}

export const SneakerCard: FC<SneakerCardProps> = memo(
  ({ id, title, type, price, field, collectionName }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { isValid, favourites, addToFavourites, removeFromFavourites } = useStore(
      (state) => state,
    );
    const favourite = favourites?.filter((s) => s.sneaker === id)[0];

    const handleFavouriteClick = async () => {
      try {
        if (!isValid) {
          navigate({ to: '/auth/signin' });
          return;
        }

        if (favourite) {
          deleteFromFavouritesCollection(favourite.id).then(() =>
            removeFromFavourites(favourite.id),
          );
        } else {
          addToFavouritesCollection(id).then((record) => addToFavourites(record));
        }
      } catch (error) {
        if (error instanceof ClientResponseError) {
          const err = new ClientResponseError(error);
          toast({
            title: err.name,
            description: err.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Не удалось добавить товар в избранное',
            description: 'Попробуйте еще раз',
            variant: 'destructive',
          });
        }
      }
    };

    return (
      <div className="relative">
        <span
          onClick={handleFavouriteClick}
          className={`${favourite ? 'active' : ''} material-symbols-outlined absolute left-2 top-2 text-5xl cursor-pointer`}>
          favorite
        </span>
        <img
          className="bg-stone-200"
          src={constructImageURL(field, collectionName, id)}
          alt={title}
        />
        <Link to={`/sneakers/$sneakerid`} params={{ sneakerid: id }}>
          <h2 className="text-2xl font-semibold py-4 hover:text-red-500 transition">
            {type + ' ' + title}
          </h2>
        </Link>
        <span className="text-stone-500 text-lg">{price} ₽</span>
      </div>
    );
  },
);
