'use client';
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux';
import { store } from '@/redux/store';


export function ReduxProvider({ pageProps, children }: { pageProps: any; children: React.ReactNode }) {
  const session = pageProps?.session || null; // Kiểm tra session có tồn tại không

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}
