import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import useLogout from '@/hooks/useLogout';
import { useStore } from '@/store/store';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { constructImageURL } from '@/lib/helpers';

export const Route = createLazyFileRoute('/profile')({
  component: Profile,
});

function Profile() {
  const logout = useLogout();
  const navigate = useNavigate({ from: '/profile' });
  const user = useStore((state) => state.user);
  const isUserValid = useStore((state) => state.isValid);

  useEffect(() => {
    if (!isUserValid) {
      navigate({ to: '/auth/signin' });
    }
  }, [isUserValid, navigate]);

  return (
    <div className="w-full max-w-lg mx-auto mt-20 flex flex-col items-center">
      <div className="w-56 h-56 relative mb-6">
        {user?.avatar ? (
          <img
            src={constructImageURL(user.avatar, 'users', user.id)}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : null}
        <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-tl-lg">
          <p className="text-sm font-semibold">Имя:</p>
          <p className="text-lg">{user?.username}</p>
        </div>
      </div>
      <div className="w-full flex justify-between mb-6">
        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm font-semibold mb-2">Email:</p>
          <p className="text-gray-600 text-lg">{user?.email}</p>
        </div>
        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm font-semibold mb-2">Телефон:</p>
          <p className="text-gray-600 text-lg">
            {user?.phone_number ? user.phone_number : 'Не указан'}
          </p>
        </div>
      </div>
      <div className="w-full">
        <Button onClick={() => confirm('Вы уверены?') && logout()}>Выйти из аккаунта</Button>
      </div>
    </div>
  );
}
