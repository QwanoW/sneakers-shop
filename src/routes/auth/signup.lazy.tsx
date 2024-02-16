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
import useRegister from '@/hooks/useRegister'; // make sure this hook exists and works as expected
import { signUpSchema } from '@/lib/zod'; // make sure this schema exists and works as expected
import { User, useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createLazyFileRoute('/auth/signup')({
  component: Signup,
});

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const setIsValid = useStore((state) => state.setIsValid);
  const setUser = useStore((state) => state.setUser);

  const register = useRegister();
  const navigate = useNavigate({ from: '/auth/signup' });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phone_number: '',
      avatar: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      if (data.password !== data.passwordConfirm) {
        form.setError('passwordConfirm', {
          type: 'custom',
          message: 'Пароли не совпадают',
        });
        return;
      }

      setIsLoading(true);
      const resp = await register(data);
      setIsValid(true);
      setUser(resp as User);
      navigate({ to: '/' });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[500px] mx-auto">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Введите свои данные</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="password confirmation" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input placeholder="+7(123)-123-12-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="picture">Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          form.setValue('avatar', file);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              Зарегистрироваться
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
