import useSupabase from "./useSupabase";
import { getLeagueById } from "../queries/get-league-by-id";
import { useQuery } from "@tanstack/react-query";

function useLeagueQuery(organizationId: number) {
  const client = useSupabase();
  const queryKey = ["organization", organizationId];

  const queryFn = async () => {
    return getLeagueById(client, organizationId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useLeagueQuery;
