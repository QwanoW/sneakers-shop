import { useToast } from '@/components/ui/use-toast';
import { addToCartItemsCollection, deleteFromCartItemsCollection } from '@/lib/pocketbase';
import { useStore } from '@/store/store';
import { useNavigate } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';

const useCart = (id: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isValid, cartItems, addToCartItems, removeFromCartItems } = useStore((state) => state);
  const cartItem = cartItems?.find((f) => f?.expand?.sneaker.id === id);
  const [isInCart, setIsInCart] = useState<boolean>(Boolean(cartItem));

  const handleCartClick = async (size: number, quantity: number = 1) => {
    try {
      if (!isValid) {
        navigate({ to: '/auth/signin' });
        return;
      }

      if (isInCart && cartItem) {
        await deleteFromCartItemsCollection(cartItem.id);
        removeFromCartItems(cartItem.id);
        setIsInCart(false);
      } else {
        const record = await addToCartItemsCollection(id, size, quantity);
        addToCartItems(record);
        setIsInCart(true);
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
          title: 'Не удалось добавить товар в корзину',
          description: 'Попробуйте еще раз',
          variant: 'destructive',
        });
      }
    }
  };

  return {
    handleCartClick,
    isInCart,
  };
};

export default useCart;
