'use client';
import store from '../redux/store';
// import { LOCAL_STORAGE_KEY } from '../types/common';
import { AuthProvider, QueryProvider } from '@/app/providers';
// import { useEffect } from 'react';
import { Provider } from 'react-redux';
// import { ToastContainer } from 'react-toastify';

const AuthenticatedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY.API_URL, process.env.API_URL!);
  // }, []);

  return (
    <div>
      <AuthProvider>
        <Provider store={store}>
          <QueryProvider>{children}</QueryProvider>
        </Provider>
      </AuthProvider>
      {/* <ToastContainer hideProgressBar bodyStyle={{ margin: 0, padding: 0 }} toastStyle={{ padding: 10 }} /> */}
    </div>
  );
};

export default AuthenticatedLayout;
