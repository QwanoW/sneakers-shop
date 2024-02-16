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
import { pb } from '@/lib/pocketbase';
import { signInSchema } from '@/lib/zod';
import { User, useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createLazyFileRoute('/auth/signin')({
  component: Signin,
});

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate({ from: '/auth/sigin' });
  const setIsValid = useStore((state) => state.setIsValid);
  const setUser = useStore((state) => state.setUser);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsLoading(true);
      const { record } = await pb.collection('users').authWithPassword(data.email, data.password);
      setIsValid(true);
      setUser(record as User);
      navigate({ to: '/' });
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message || '';
        const fields = ['email', 'password'] as const;

        fields.forEach((field) => {
          form.setError(field, {
            type: 'custom',
            message: field === 'password' ? message : '',
          });
        });
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
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
