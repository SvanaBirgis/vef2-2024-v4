import React from "react";
import styles from "./gamesgrid.module.css";
import Link from "next/link";
import { format } from "date-fns";
import GameCard from "../gameCard/gameCard";


export default function GamesGrid({ games }) {
    if (!games) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.games}>
                {games.map(game => ( // todo adlaga ad okkar games og baeta vid stilum i gamesgrid.module.css
                    <GameCard game={game} key={game.id} />
                ))}
            </div>
        </div>
    );
}