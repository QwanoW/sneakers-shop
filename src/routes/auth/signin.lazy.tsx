import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useLogin from '@/hooks/useLogin';
import { signInSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createLazyFileRoute('/auth/signin')({
  component: Signin,
});

function Signin() {
  const { toast } = useToast();
  const navigate = useNavigate({ from: '/auth/sigin' });
  const { login, isLoading } = useLogin();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      await login(data);
      await navigate({ to: '/' });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        const err = new ClientResponseError(error);
        if (Object.keys(err.data.data).length > 0) {
          Object.keys(err.data.data).forEach((key) => {
            form.setError(key as keyof z.infer<typeof signInSchema>, {
              type: 'custom',
              message: err.data.data[key].message,
            });
          });
        } else {
          toast({
            title: 'Неправильный email или пароль',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Что-то пошло не так',
          description: 'Попробуйте ещё раз',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Card className="w-[500px] mx-auto">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>Введите свои данные</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
