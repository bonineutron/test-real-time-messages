'use client';

import { Layout } from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import './global.scss';

interface RootLayoutProps {
   children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <html lang='es'>
         <head>
            <title>Real Time Messages</title>
         </head>

         <Provider store={store}>
            <Layout>{children}</Layout>
         </Provider>
      </html>
   );
}
