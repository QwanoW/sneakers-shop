import { getAllFavourites, loginUser } from '@/lib/pocketbase';
import { useStore } from '@/store/store';
import { useState } from 'react';

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsValid, setFavourites } = useStore((state) => state);

  const login = async (userData: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      const resp = await loginUser(userData);

      setUser(resp.record);
      setIsValid(true);

      setFavourites(await getAllFavourites());
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}

export default useLogin;
