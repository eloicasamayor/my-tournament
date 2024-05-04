import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { Database } from "../utils/database.types";
import { updateLeagueById } from "../queries/update-league-by-id";

export function useUpdateLeagueMutation() {
  const client = useSupabase();

  type Tleague = Database["public"]["Tables"]["leagues"]["Row"];

  const mutationFn = async ({
    leagueId,
    leagueName,
  }: {
    leagueId: number;
    leagueName: string;
  }) => {
    return updateLeagueById(client, {
      id: leagueId,
      data: { name: leagueName },
    }).then((result) => result.data);
  };

  return useMutation({ mutationFn });
}
