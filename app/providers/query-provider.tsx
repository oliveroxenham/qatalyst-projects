'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';
import React from 'react';

const createDefaultQueryFn = (apiUrl: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async ({ queryKey }: { queryKey: any }) => {
    console.log('***** queryKey=', queryKey);
    const [api, variables] = queryKey;
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken;
    const headers = {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'test',
    };

    if (!api) {
      throw new Error('Missing api path');
    };

    console.log(`fetching: ${apiUrl}${api}`);
    const response = await axios.get(`${apiUrl}${api}`, {
      headers,
      params: variables,
    });
    if (!response.data) {
      throw new Error('Invalid api response');
    }
    return response.data;
  };
};

function makeQueryClient() {
  const apiUrl = isServer ? process.env.API_URL! : process.env.NEXT_PUBLIC_API_URL!;
  console.log('makeQueryClient() : apiUrl=', apiUrl);
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        queryFn: createDefaultQueryFn(apiUrl),
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    console.log('returning new QueryClient() on server...');
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    console.log('returning new QueryClient() on client...');
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <div>
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>
  );
}

// =====================================================================

// // const createDefaultMutationFn = (apiUrl: string) => {
// //   return async ({ mutationKey }: any) => {
// //     const [api] = mutationKey;
// //     const session = await fetchAuthSession();
// //     const idToken = session.tokens?.idToken;

// //     const headers = {
// //       Authorization: `Bearer ${idToken}`,
// //       'Content-Type': 'application/json',
// //       'ngrok-skip-browser-warning': 'test',
// //     };

// //     const response = await axios.post(`${apiUrl}${api}`, { headers });
// //     return response.data;
// //   };
// // };

// const createQueryConfig = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
//   console.log('===========>>>> apiUrl=', apiUrl);
//   return {
//     defaultOptions: {
//       // mutations: {
//       //   mutationFn: createDefaultMutationFn(apiUrl),
//       // },
//       queries: {
//         queryFn: createDefaultQueryFn(apiUrl),
//       },
//     },
//   };
// };

// const QueryProvider = ({
//   children,
// }: {
//   readonly children: React.ReactNode;
// }) => {
//   const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

//   useEffect(() => {
//     const initializeQueryClient = async () => {
//       const queryClientConfig = await createQueryConfig();
//       const client = new QueryClient(queryClientConfig);
//       setQueryClient(client);
//     };

//     initializeQueryClient();
//   }, []);

//   // TODO: find way to mock queryClient to improve unit test because every page inside QueryProvider return Loading
//   if (!queryClient) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// };

// export default QueryProvider;
