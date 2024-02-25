import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { RecordModel } from 'pocketbase';

interface CreateOrderFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  deliveryPoints: RecordModel[];
  totalPrice: number;
}

export default function CreateOrderForm({
  handleSubmit,
  deliveryPoints,
  totalPrice,
}: CreateOrderFormProps) {
  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
      <Select name="delivery_point" required>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Пункт выдачи" />
        </SelectTrigger>
        <SelectContent>
          {deliveryPoints.map((point) => (
            <SelectItem key={point.id} value={point.id}>
              {point.address}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea rows={5} placeholder="Пожелания к заказу" name="wishes" />

      <h2 className="font-medium text-2xl">Товары:</h2>

      <SheetTrigger className="self-start bg-rose-500 text-white py-2 px-4">
        Просмотреть корзину
      </SheetTrigger>
      <p className="text-xl">Итого: {totalPrice} руб.</p>
      <p className="text-xl">Итого со скидкой: {totalPrice} руб.</p>
      <Button className="rounded-none p-7 bg-red-500 hover:bg-red-700">Оформить заказ</Button>
    </form>
  );
}
