'use client';

import { ProfileButton } from './ProfileButton/ProfileButton';
import { EPlacement } from '@/components/Popup/Popup.enum';
import { Popup, SideBarMobile } from '@/components';
import { usePathname } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { LuBell } from 'react-icons/lu';
import { FiMenu } from 'react-icons/fi';

export function TopBar(): JSX.Element {
   // Configuration
   const pathname = usePathname();

   // Redux states
   const { openSideBarDesktop } = useSelector((state: RootState) => state.sideBarDesktop);

   // States
   const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      setOpenMenuMobile(false);
   }, [pathname]);

   return (
      <div className='sticky top-0 right-0 min-h-[60px] w-full bg-white shadow-md px-6 text-primary-gray z-[7]'>
         <div className='h-full w-full flex items-center justify-between'>
            <div className='h-full w-fit flex gap-6 md:gap-3 items-center '>
               {!openSideBarDesktop && <img src='/logo_md.svg' alt='logo' className={`w-auto h-[18px]`} />}

               <button onClick={() => setOpenMenuMobile(true)} className='min-w-[24px] text-[24px] md:hidden'>
                  <FiMenu />
               </button>

               <button onClick={() => {}} className='rounded-full md:p-[6px] md:hover:bg-light-gray '>
                  <IoArrowBack className='w-[24px] text-[24px]' />
               </button>
            </div>

            <div className='h-full flex items-center gap-6 md:gap-3'>
               <Popup
                  content={
                     <div className='flex flex-col items-center gap-3'>
                        <p>Preparando notificaciones</p>

                        <img src='/global/developer.png' alt='developer' className='h-auto w-[100px]' />
                     </div>
                  }
                  placement={EPlacement.BottomEnd}>
                  <div className='rounded-full md:p-[6px] md:hover:bg-light-gray'>
                     <LuBell className='min-w-[24px] text-[24px]' />
                  </div>
               </Popup>

               <ProfileButton />
            </div>
         </div>

         {openMenuMobile && <SideBarMobile setOpen={setOpenMenuMobile} />}
      </div>
   );
}
