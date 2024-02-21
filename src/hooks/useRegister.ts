import { createUser } from '@/lib/pocketbase';
import { useState } from 'react';

function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (userData: FormData) => {
    try {
      setIsLoading(true);

      await createUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}

export default useRegister;
