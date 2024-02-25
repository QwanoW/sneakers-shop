import { useToast } from '@/components/ui/use-toast';
import { useStore } from '@/store/store';
import useCart from './useCart';
import { updateCartItemQuantity } from '@/lib/pocketbase'; // Added missing import statement

const useCartItemQuantity = (id: string, sneakerID: string, originalQuantity: number) => {
  const { toast } = useToast();

  const { changeCartItemQuantity } = useStore((state) => state);
  const { isInCart } = useCart(sneakerID);

  async function alterCartItemQuantity(quantity: number) {
    if (quantity < 1) {
      toast({
        title: 'Количество товара не может быть меньше 1',
        variant: 'destructive',
      });
      return;
    }

    if (!isInCart) {
      toast({
        title: 'Товар не найден',
        description: 'Попробуйте еще раз',
        variant: 'destructive',
      });
    }

    try {
      changeCartItemQuantity(id, quantity);
      await updateCartItemQuantity(id, quantity);
    } catch (error) {
      changeCartItemQuantity(id, originalQuantity);
      toast({
        title: 'Не удалось изменить количество товара',
        description: 'Попробуйте еще раз',
        variant: 'destructive',
      });
    }
  }

  return alterCartItemQuantity;
};

export default useCartItemQuantity;
