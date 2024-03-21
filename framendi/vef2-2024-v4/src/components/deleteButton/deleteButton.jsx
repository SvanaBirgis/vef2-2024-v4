'use client'
import Image from "next/image";
import styles from "./deleteButton.module.css";

export default function DeleteButton({ gameId, handleDeleteSuccess }) {
    async function deleteGameById(id) {
        const res = await fetch(`api/games/${id}`, {
            method: "DELETE",
        });
        console.log('res', res)
        if (res.ok) {
            console.info("Game deleted successfully");
            handleDeleteSuccess(id); // Call the callback function on successful deletion
        } else {
            console.error("Error deleting game");
            console.error(await res.json());
        }
    }

    return (
        <div className={styles.deleteButtonContainer}>
            <button
                className={styles.deleteButton}
                onClick={(e) => {
                    e.preventDefault();
                    deleteGameById(gameId)}
                }
            >
                <Image
                    src="./trash.svg"
                    width={40}
                    height={45}
                    quality={100}
                />
            </button>
        </div>
    );
}


