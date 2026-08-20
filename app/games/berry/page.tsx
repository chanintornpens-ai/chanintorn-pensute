import GameEmbed from "../GameEmbed";

export const metadata = { title: "The Wild Berry Season | Berry Picking Simulation" };

export default function Page() {
  return (
    <GameEmbed
      src="/games/berry-picking-game.html"
      title="Berry Picking Simulation"
    />
  );
}
