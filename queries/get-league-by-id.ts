import { TypedSupabaseClient } from "../utils/supabase";

export function getLeagueById(client: TypedSupabaseClient, leagueId: number) {
  return client
    .from("leagues")
    .select(
      `
      id,
      name
    `
    )
    .eq("id", leagueId)
    .throwOnError()
    .single();
}
