'use server'

import { revalidatePath } from "next/cache";

export async function addGameByFormData(formData) {
    if (!formData) {
        return;
    }
    const postBody = {
        home: formData.get('home'),
        away: formData.get('away'),
        home_score: parseInt(formData.get('homeScore')),
        away_score: parseInt(formData.get('awayScore')),
        date: new Date(formData.get('date')).toISOString(),
    }
    console.log('postbody',postBody)
    const res = await fetch(`${process.env.API_URL}/games`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
    });
    console.log('res',res)

    if (res.ok) {
        console.info("Game added successfully");
        revalidatePath('/games', 'page');
    } else {
        console.error("Error adding game");
        console.error(await res.json());
    }
}