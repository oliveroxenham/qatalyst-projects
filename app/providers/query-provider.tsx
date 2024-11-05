'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const createDefaultQueryFn = (apiUrl: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async ({ queryKey }: { queryKey: any }) => {
    const [api, variables] = queryKey;
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken;
    const headers = {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'test',
    };

    if (!api) return null;

    const response = await axios.get(`${apiUrl}${api}`, { headers, params: variables });
    return response.data;
  };
};

// const createDefaultMutationFn = (apiUrl: string) => {
//   return async ({ mutationKey }: any) => {
//     const [api] = mutationKey;
//     const session = await fetchAuthSession();
//     const idToken = session.tokens?.idToken;

//     const headers = {
//       Authorization: `Bearer ${idToken}`,
//       'Content-Type': 'application/json',
//       'ngrok-skip-browser-warning': 'test',
//     };

//     const response = await axios.post(`${apiUrl}${api}`, { headers });
//     return response.data;
//   };
// };

const createQueryConfig = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  console.log('===========>>>> apiUrl=', apiUrl);
  return {
    defaultOptions: {
      // mutations: {
      //   mutationFn: createDefaultMutationFn(apiUrl),
      // },
      queries: {
        queryFn: createDefaultQueryFn(apiUrl),
      },
    },
  };
};

const QueryProvider = ({ children }: { readonly children: React.ReactNode }) => {
  const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

  useEffect(() => {
    const initializeQueryClient = async () => {
      const queryClientConfig = await createQueryConfig();
      const client = new QueryClient(queryClientConfig);
      setQueryClient(client);
    };

    initializeQueryClient();
  }, []);

  // TODO: find way to mock queryClient to improve unit test because every page inside QueryProvider return Loading
  if (!queryClient) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
