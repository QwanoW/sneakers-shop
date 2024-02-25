import { constructImageURL } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { FC, memo } from 'react';
import useFavourite from '@/hooks/useFavourite';

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
    const { handleFavouriteClick, isFavourite } = useFavourite(id);

    return (
      <div className="relative">
        <span
          onClick={handleFavouriteClick}
          className={`${isFavourite ? 'active' : ''} material-symbols-outlined absolute left-2 top-2 text-5xl cursor-pointer`}>
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
