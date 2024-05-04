"use client";

import { LeagueForm } from "../../../../components/LeagueForm";
import useLeagueQuery from "../../../../hooks/use-league";

export default function LeaguePage({ params }: { params: { id: number } }) {
  const { data: league, isLoading, isError } = useLeagueQuery(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !league) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>{league.name}</h1>
      <LeagueForm leagueId={params.id} leagueName={league.name} />
    </div>
  );
}
