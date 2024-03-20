import React from "react";
import styles from "./addGame.module.css";
import Image from "next/image";

async function getTeams() {
    const res = await fetch(`${process.env.API_URL}/teams`);
    let teams = await res.json();
    return teams;
}

export default async function AddGame() {
    'use server'
    const teams = await getTeams();

    async function addGame(formData) {
        'use server'
        const postBody = {
            home: formData.get('home'),
            away: formData.get('away'),
            home_score: parseInt(formData.get('homeScore')),
            away_score: parseInt(formData.get('awayScore')),
            date: new Date(formData.get('date')).toISOString(),
        }
        console.log(postBody)
        const res = await fetch(`${process.env.API_URL}/games`, {
            method: "POST",
            body: postBody,
        });

        if (res.ok) {
            console.info("Game added successfully");
        } else {
            console.error("Error adding game");
            console.error(await res.json());
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.addGameTitle}>
                <h1>Add Game</h1>
            </div>
            <form action={addGame} >
                <label className={styles.dateContainer}>
                    <p className={styles.dateTitle}>Date:</p>
                    <input type="datetime-local" name="date" />
                </label>
                <div className={styles.teamsContainer}>
                    <label className={styles.homeName}>
                        <p className={styles.homeNameTitle}>Home Team:</p>
                        <select name="home" >
                            {teams.map(team => (
                                <option value={team.id} key={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                    <div className={styles.vs}>
                        VS
                    </div>
                    <label className={styles.awayName}>
                        <p className={styles.awayNameTitle}>Away Team:</p>
                        <select name="away" >
                            {teams.map(team => (
                                <option value={team.id} key={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className={styles.scoreContainer}>
                    <label className={styles.homeScore}>
                        <p className={styles.homeScoreTitle}>Home Score:</p>
                        <input type="number" name="homeScore" min={0} />
                    </label>
                    <label className={styles.awayScore}>
                        <p className={styles.awayScoreTitle}>Away Score:</p>
                        <input type="number" name="awayScore" min={0} />
                    </label>
                </div>
                <div className={styles.addGameButtonContainer}>
                    <button type="submit" className={styles.addButton}><Image
                        src="/check.png"
                        width={40}
                        height={45}
                        quality={100}
                    /></button>
                </div>
            </form>
        </div>
    );
}