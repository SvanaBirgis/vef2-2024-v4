import Image from "next/image";
import styles from "./page.module.css";
import GamesGrid from "@/components/gamesgrid/gamesgrid";

async function getHomeGames() {
  const res = await fetch(`${process.env.API_URL}/games`);
  let games = await res.json(); // Just get the 5 latest games by date
  games.sort((a, b) => new Date(b.date) - new Date(a.date));
  games = games.slice(0, 5);
  return games;
}

export default async function Home() {
  const games = await getHomeGames();
  // console.log('games', games);
  return (
    <main className={styles.main}>
      <GamesGrid games={games} />
    </main>
  );
}
