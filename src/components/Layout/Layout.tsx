'use client';

import { AlertDialog, SideBarDesktop, TopBar } from '../../components';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

interface LayoutProps {
   children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
   // Configuration
   const pathname = usePathname();

   const router = useRouter();

   // Redux states
   const { username } = useSelector((state: RootState) => state.user);

   // Effects
   useEffect(() => {
      if (!username && pathname !== '/auth') {
         router.push('/auth');
      }

      if (username && pathname === '/auth') {
         router.push('/');
      }
   }, [username]);

   if (pathname === '/auth') {
      return (
         <body className='h-screen w-screen overflow-hidden bg-gray-50'>
            <div className='h-full w-full'>{children}</div>

            <AlertDialog />
         </body>
      );
   }

   return (
      <body className='h-screen w-screen flex overflow-hidden bg-gray-50'>
         <SideBarDesktop />

         <div className={`h-full w-full flex flex-col overflow-x-hidden`}>
            <TopBar />

            <div className='h-full w-full flex flex-col justify-between items-center'>
               <div className='h-fit w-full max-w-[1000px] p-3 md:p-6'>{children}</div>

               <div className='h-fit w-full flex items-center justify-end px-6 pb-3 text-primary-gray'>
                  © 2024, Boni Dev.
               </div>
            </div>
         </div>

         <AlertDialog />
      </body>
   );
}
