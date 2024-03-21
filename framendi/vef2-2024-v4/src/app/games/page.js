'use client'
import Image from "next/image";
import useSWR from 'swr'
import { Suspense, useEffect, useState } from "react";
import styles from "./page.module.css";
import GamesGrid from "@/components/gamesgrid/gamesgrid";
import AddGame from "@/components/addGame/addGame";
import { fetcher } from "@/utils/fetcher";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const { data, isLoading, error, mutate } = useSWR(`/api/games`, fetcher)
  useEffect(() => {
    setGames(data);

    return () => {
      setGames([]);
    }
  }, [data])

  if (error) return <div>Failed to load..</div>
  if (isLoading) return <div>Loading...</div>


  const handleDeleteSuccess = (deletedGameId) => {
    setGames(games.filter(game => game.id !== deletedGameId));
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.addGameContainer}>
          <AddGame />
        </div>
        <div className={styles.container}>
          <GamesGrid games={data} showDeleteButton={true} handleDeleteSuccess={handleDeleteSuccess} />
        </div>
      </Suspense>
    </>
  );
}
