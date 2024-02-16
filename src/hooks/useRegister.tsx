import { pb } from '../lib/pocketbase';

interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone_number?: string;
  avatar?: File;
}

export default function useRegister() {
  async function register(credentials: User) {
    const formData = new FormData();
    Object.keys(credentials).forEach((key) => {
      const value = credentials[key as keyof User];
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    return pb.collection('users').create(formData);
  }

  return register;
}
