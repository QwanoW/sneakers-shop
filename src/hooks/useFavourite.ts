import { useToast } from '@/components/ui/use-toast';
import { addToFavouritesCollection, deleteFromFavouritesCollection } from '@/lib/pocketbase';
import { useStore } from '@/store/store';
import { useNavigate } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';

const useFavourite = (id: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isValid, favourites, addToFavourites, removeFromFavourites } = useStore((state) => state);
  const favouriteRecord = favourites?.find((f) => f.expand?.sneaker.id === id);
  const [isFavourite, setIsFavourite] = useState<boolean>(Boolean(favouriteRecord));

  const handleFavouriteClick = async () => {
    try {
      if (!isValid) {
        navigate({ to: '/auth/signin' });
        return;
      }

      if (isFavourite && favouriteRecord) {
        setIsFavourite(false);
        await deleteFromFavouritesCollection(favouriteRecord.id);
        removeFromFavourites(favouriteRecord.id);
      } else {
        setIsFavourite(true);
        const record = await addToFavouritesCollection(id);
        addToFavourites(record);
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

  return {
    handleFavouriteClick,
    isFavourite,
  };
};

export default useFavourite;
