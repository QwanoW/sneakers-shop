import CreateOrderForm from '@/components/order/CreateOrderForm';
import { useToast } from '@/components/ui/use-toast';
import { createOrder, deleteFromCartItemsCollection } from '@/lib/pocketbase';
import { useStore } from '@/store/store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RecordModel } from 'pocketbase';

export const Route = createFileRoute('/orders/create')({
  component: CreateOrder,
});

function CreateOrder() {
  const { cartItems, deliveryPoints, addOrder, clearCartItems } = useStore((state) => state);
  const navigate = useNavigate({ from: '/orders/create' });
  const { toast } = useToast();

  if (!cartItems || !cartItems.length) {
    return <h1 className="mt-32 text-center text-3xl font-medium">Корзина пуста</h1>;
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item?.expand?.sneaker.price * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const deliveryPoint = form.delivery_point.value;
    const wishes = form.wishes.value;

    const items = cartItems.map((item) => ({
      ...item.expand?.sneaker,
      quantity: item.quantity,
    })) as RecordModel[];

    try {
      const order = await createOrder({
        total_price: totalPrice,
        wishes,
        items,
        delivery_point: deliveryPoint,
      });
      addOrder(order);
      cartItems.forEach((item) => {
        if (item.id) {
          deleteFromCartItemsCollection(item.id);
        }
      });
      clearCartItems();
      toast({
        title: 'Заказ успешно оформлен',
        description: 'Спасибо за покупку!',
        variant: 'default',
      });
      navigate({ to: '/profile' });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось оформить заказ',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-stone-50 p-2 sm:p-4 space-y-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Оформление заказа</h1>
      <CreateOrderForm {...{ deliveryPoints, totalPrice, handleSubmit }} />
    </div>
  );
}

export default CreateOrder;
