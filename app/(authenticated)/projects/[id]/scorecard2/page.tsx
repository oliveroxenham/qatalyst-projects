import ScoreCardPage from './ScorecardPage';

export default async function ScorecardPageSC({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ScoreCardPage id={id} />;
}
