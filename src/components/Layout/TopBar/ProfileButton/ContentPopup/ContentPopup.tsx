import { ERoleUser } from '@/redux/features/user/user.interface';
import { removeUser } from '@/redux/features/user/user.slice';
import { useDispatch } from 'react-redux';
import { Button } from '@/components';

interface ContentPopupProps {
   username: string;
   role: ERoleUser | null;
}

export function ContentPopup({ username, role }: ContentPopupProps): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // Methods
   const logoutApp = () => {
      localStorage.removeItem('user');

      dispatch(removeUser());
   };

   return (
      <div>
         <div className='h-fit w-full max-w-[300px] flex flex-col border-b-[1px] border-medium-gray pb-2 text-right items-start'>
            <p className='font-semibold'>{username}</p>

            <p className='text-[14px]'>{role ? (role === ERoleUser.Student ? 'Estudiante' : 'Moderador') : ''}</p>
         </div>

         <div className='mt-3 flex justify-end'>
            <Button onClick={logoutApp}>Cerrar sesión</Button>
         </div>
      </div>
   );
}
