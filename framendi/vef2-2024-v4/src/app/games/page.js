import Image from "next/image";
import styles from "./page.module.css";
import GamesGrid from "@/components/gamesgrid/gamesgrid";
import AddGame from "@/components/addGame/addGame";

async function getGames() {
  const res = await fetch(`${process.env.API_URL}/games`);
  let games = await res.json();
  games.sort((a, b) => new Date(a.date) - new Date(b.date));
  return games;
}

async function deleteGameById(id) {
  const res = await fetch(`${process.env.API_URL}/games/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}



export default async function GamesPage() {
  const games = await getGames();

  if (!games) {
    return notFound(); // TODO betra?
  }
  return (
    <>
    <div className={styles.addGameContainer}>
      <AddGame />
    </div>
    <div className={styles.container}>
      <GamesGrid games={games} showDeleteButton={true}/>
    </div>
    </>
  );
}
