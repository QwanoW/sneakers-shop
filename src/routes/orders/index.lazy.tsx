import OrdersTable from '@/components/order/OrdersTable';
import { useStore } from '@/store/store';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/orders/')({
  component: Orders,
});

function Orders() {
  const { orders } = useStore((state) => state);
  return (
    <div className="w-full">
      <h1 className="text-center py-10 font-bold text-2xl">Мои заказы</h1>
      {orders.length > 0 ? (
        <OrdersTable orders={orders} />
      ) : (
        <div className="w-full">
          <h2 className="text-center text-2xl">Вы ещё ничего на заказывали 😔</h2>
        </div>
      )}
    </div>
  );
}

export default Orders;
