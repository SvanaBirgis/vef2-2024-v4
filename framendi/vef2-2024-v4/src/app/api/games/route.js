import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const result = await getGames()
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'failed to fetch games in api route' }, { status: 500 })
    }
}

async function getGames() {
    const res = await fetch(`${process.env.API_URL}/games`, { cache: 'no-store' });
    let games = await res.json();
    games.sort((a, b) => new Date(a.date) - new Date(b.date));
    return games;
}
