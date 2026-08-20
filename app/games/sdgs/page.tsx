import GameEmbed from "../GameEmbed";

export const metadata = { title: "Agenda 2030 — Steward of the Goals | SDGs Game" };

export default function Page() {
  return (
    <GameEmbed
      src="https://mdgs-game-app.vercel.app/sdgs"
      title="Agenda 2030 — Steward of the Goals"
    />
  );
}
