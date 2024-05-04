import { useUpdateLeagueMutation } from "../hooks/use-update-league-mutation";
import useLeagueQuery from "../hooks/use-league";

export function LeagueForm({
  leagueId,
  leagueName,
}: {
  leagueId: number;
  leagueName: string;
}) {
  const updateLeagueMutation = useUpdateLeagueMutation();
  const getLeagueQuery = useLeagueQuery(leagueId);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    updateLeagueMutation.mutate({
      leagueId: leagueId,
      leagueName: name,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input
        style={{ color: "black" }}
        name="name"
        type="text"
        placeholder={leagueName}
      ></input>
    </form>
  );
}
