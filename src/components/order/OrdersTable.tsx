import { RecordModelWithItems, getDeliveryPoint } from '@/store/store';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function OrdersTable({ orders }: { orders: RecordModelWithItems[] }) {
  return (
    <Table>
      <TableCaption>Список ваших заказов</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Товары</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Пункт выдачи</TableHead>
          <TableHead className="text-right">Сумма</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="flex flex-col gap-2">
                {order.items
                  .reduce((acc, item) => {
                    return acc + `${item.title} (${item.quantity} ед.)\n`;
                  }, '')
                  .replace('\n', '; ')}
              </div>
            </TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{getDeliveryPoint(order.delivery_point)?.address || 'Не указан'}</TableCell>
            <TableCell className="text-right">{order.total_price} ₽</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
