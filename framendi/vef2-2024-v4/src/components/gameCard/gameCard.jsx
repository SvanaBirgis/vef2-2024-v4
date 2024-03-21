import React from "react";
import styles from "./gameCard.module.css";
import Link from "next/link";
import GameDate from "../gameDate/gameDate";
import Image from "next/image";

export default function GameCard({ game, showDeleteButton }) {
    if (!game) {
        return null;
    }

    // async function deleteGameById(id) {
    //     'use server'
    //     const res = await fetch(`${process.env.API_URL}/games/${id}`, {
    //         method: "DELETE",
    //     });
    //     return res;
    // }
    async function deleteGameById(id, event) {
        // Prevent the link navigation
        event.stopPropagation();
        // event.preventDefault();

        const res = await fetch(`${process.env.API_URL}/games/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            // Handle successful deletion, e.g., redirect or refresh the list
            console.log('Game deleted successfully');
            // Redirect or refresh the list here, for example:
            // window.location.href = '/games';
        } else {
            // Handle error
            console.error('Failed to delete the game');
        }
    }

    return (
        <div className={styles.gameContainer} key={game.id}>
            <Link href={`/games/${game.id}`}>
                <a className={styles.gameLink}> {/* Ensure clickable area is properly defined */}
                    <div className={styles.dateContainer}>
                        <GameDate date={new Date(game.date)} />
                    </div>
                    <div className={styles.teamsContainer}>
                        <div className={styles.homeName}>
                            {game.home.name}
                        </div>
                        <div className={styles.vs}>
                            VS
                        </div>
                        <div className={styles.awayName}>
                            {game.away.name}
                        </div>
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.homeScore}>
                            {game.home.score}
                        </div>
                        <div className={styles.awayScore}>
                            {game.away.score}
                        </div>
                    </div>
                </a>
            </Link>
            {showDeleteButton && (
                <button onClick={(e) => deleteGameById(game.id, e)} className={styles.deleteButton}>
                    Delete
                </button>
            )}
        </div>
    );

}

// <div className={styles.deleteButtonContainer}>
//                     <button onClick={(e) => deleteGameById(game.id, e)} className={styles.deleteButton}>
//                         <Image
//                             src="./trash.svg"
//                             width={40}
//                             height={45}
//                             quality={100}
//                         />
//                     </button>
//                 </div>