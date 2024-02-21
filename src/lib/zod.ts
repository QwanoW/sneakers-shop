import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'Минимальная длина имени - 2 символа' }).max(50, {
    message: 'Максимальная длина имени - 50 символов',
  }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Минимальная длина пароля - 8 символов' }).max(50, {
    message: 'Максимальная длина пароля - 50 символов',
  }),
  passwordConfirm: z.string().min(8, { message: 'Минимальная длина пароля - 8 символов' }).max(50, {
    message: 'Максимальная длина пароля - 50 символов',
  }),
  phoneNumber: z.string().regex(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, {
    message: 'Номер телефона должен соответствовать такому формату: +7(495)-123-45-67',
  }),
  avatar: z
    .custom<File>()
    .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
      message: 'Неправильный формат файла',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Размер файла должен быть меньше 5MB',
    })
    .optional(),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'Неправильный формат почты' }),
  password: z.string().min(8, { message: 'Минимальная длина пароля - 8 символов' }).max(50, {
    message: 'Максимальная длина пароля - 50 символов',
  }),
});
