import { useStore } from '@/store/store';
import { pb } from '../lib/pocketbase';

export default function useLogout() {
  const setIsValid = useStore((state) => state.setIsValid);

  return () => {
    pb.authStore.clear();
    setIsValid(false);
  };
}
