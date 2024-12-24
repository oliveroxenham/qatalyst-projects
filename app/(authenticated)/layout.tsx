'use client';
import store from '../redux/store';
import { QueryProvider } from '@/app/providers';
import { Provider } from 'react-redux';

const AuthenticatedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
        <Provider store={store}>
          <QueryProvider>{children}</QueryProvider>
        </Provider>
    </div>
  );
};

export default AuthenticatedLayout;
