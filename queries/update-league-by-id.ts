import { TypedSupabaseClient } from "../utils/supabase";
import { Database } from "../utils/database.types";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateLeagueMutation } from "../hooks/use-update-league-mutation";

type Tleague = Database["public"]["Tables"]["leagues"]["Row"];

export async function updateLeagueById(
  client: TypedSupabaseClient,
  params: {
    id: number;
    data: Partial<Tleague>;
  }
) {
  return client
    .from("leagues")
    .update({
      name: params.data.name,
    })
    .match({ id: params.id })
    .throwOnError()
    .select<string, Tleague>("*")
    .throwOnError()
    .single();
}

/*
const queryClient = useQueryClient();
const updateLeagueMutation = useUpdateLeagueMutation();

const promise = updateLeagueMutation.mutateAsync(leagueData, {
  onSuccess: () => {
    queryClient.invalidateQueries(["leagues", league.id]);
  },
});
*/
