import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ScoreCardPage from './ScorecardPage';
import { fetchAuthSession } from 'aws-amplify/auth';

export default async function ScorecardPageSC({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const apiUrl = process.env.API_URL!;
  console.log('[SERVER]: apiUrl=', apiUrl);

  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken;

  console.log('[SERVER]: idToken=', idToken);

  await queryClient.prefetchQuery({
    queryKey: [`/projects/${id}`],
    queryFn: async () => {
      console.log(`[SERVER] fetching ${apiUrl}/api/projects/${id}`);
      const response = await fetch(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'test',      
        }
      });
      console.log('[SERVER] response:', response);
      return response.json();
    }
  });
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> dehydrate(queryClient):', dehydrate(queryClient));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScoreCardPage id={id} />
    </HydrationBoundary>
  );
}
