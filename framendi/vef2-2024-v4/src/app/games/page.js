import Image from "next/image";
import styles from "./page.module.css";
import GamesGrid from "@/components/gamesgrid/gamesgrid";

async function getGames() {
  const res = await fetch(`${process.env.API_URL}/games`);
  const games = await res.json();
  return games;
}


export default async function GamesPage() {
  const games = await getGames();

  if (!games) {
    return notFound(); // TODO betra?
  }

  return (
    <main className={styles.container}>
      <GamesGrid games={games}/>
    </main>
  );
}
