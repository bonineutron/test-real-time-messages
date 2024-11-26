'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoginCard } from '@/components';
import { useEffect } from 'react';

export default function page(): React.JSX.Element {
   // Configuration
   const pathname = usePathname();

   const router = useRouter();

   // Redux states
   const { username } = useSelector((state: RootState) => state.user);

   // Effects
   useEffect(() => {
      if (username && pathname === '/auth') {
         router.push('/');
      }
   }, []);

   return (
      <div className='relative h-full w-full'>
         <div className='h-full w-full flex flex-col md:flex-row justify-center md:justify-around gap-6 items-center'>
            <LoginCard />

            <img src='/logo_md.svg' alt='logo_label' className='w-[200px] md:w-[250px] h-auto' />
         </div>
      </div>
   );
}
