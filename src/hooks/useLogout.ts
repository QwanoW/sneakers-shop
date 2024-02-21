import { useStore } from '@/store/store';
import { pb } from '../lib/pocketbase';

export default function useLogout() {
  const { setUser, setIsValid } = useStore((state) => state);

  return () => {
    pb.authStore.clear();

    setIsValid(false);
    setUser(undefined);
  };
}
