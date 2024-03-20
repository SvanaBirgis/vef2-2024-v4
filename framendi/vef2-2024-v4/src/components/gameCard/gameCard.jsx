import React from "react";
import styles from "./gameCard.module.css";
import Link from "next/link";
import GameDate from "../gameDate/gameDate";
import Image from "next/image";

export default function GameCard({ game, showDeleteButton }) {
    if (!game) {
        return null;
    }
    return (
        <Link href={`/games/${game.id}`} key={game.id}>
            <div className={styles.gameContainer} key={game.id}>
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
                {showDeleteButton &&
                    <div className={styles.deleteButtonContainer}>
                        <button className={styles.deleteButton}><Image
                            src="./trash.svg"
                            width={40}
                            height={45}
                            quality={100}
                        /></button>
                    </div>}
            </div>
        </Link>
    );
}