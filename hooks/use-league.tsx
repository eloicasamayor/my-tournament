import useSupabase from "./useSupabase";
import { getLeagueById } from "../queries/get-league-by-id";
import { useQuery } from "@tanstack/react-query";

function useLeagueQuery(leagueId: number) {
  const client = useSupabase();
  const queryKey = ["league", leagueId];

  const queryFn = async () => {
    return getLeagueById(client, leagueId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useLeagueQuery;
