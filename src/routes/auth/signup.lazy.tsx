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
import useRegister from '@/hooks/useRegister'; // make sure this hook exists and works as expected
import { signUpSchema } from '@/lib/zod'; // make sure this schema exists and works as expected
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createLazyFileRoute('/auth/signup')({
  component: Signup,
});

function Signup() {
  const { toast } = useToast();
  const isValid = useStore((state) => state.isValid);
  const { register, isLoading } = useRegister();
  const navigate = useNavigate({ from: '/auth/signup' });

  useEffect(() => {
    if (isValid) {
      navigate({ to: '/' });
    }
  }, [isValid, navigate]);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      avatar: undefined,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof signUpSchema> & { [key: string]: string | File | undefined },
  ) => {
    try {
      if (data.password !== data.passwordConfirm) {
        throw new ClientResponseError({
          data: {
            data: {
              password: {
                message: 'Пароли не совпадают',
              },
              passwordConfirm: {
                message: 'Пароли не совпадают',
              },
            },
          },
        });
      }

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined) {
          if (data[key] instanceof File) {
            formData.append(key, data[key] as File, (data[key] as File).name);
          } else {
            formData.append(key, data[key] as string);
          }
        }
      });

      await register(formData);
      toast({
        variant: 'default',
        title: 'Регистрация прошла успешно!',
        description: 'Теперь вы можете войти в свой аккаунт.',
      });
      navigate({ to: '/auth/signin' });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        const err = new ClientResponseError(error);

        Object.keys(err.data.data).forEach((key) => {
          form.setError(key as keyof z.infer<typeof signUpSchema>, {
            type: 'custom',
            message: err.data.data[key].message,
          });
        });
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
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Введите свои данные</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+7(123)-123-12-12"
                      minLength={17}
                      maxLength={17}
                      {...field}
                    />
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
