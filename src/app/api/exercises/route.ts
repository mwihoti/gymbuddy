import { NextResponse } from "next/server";

const API_KEY = process.env.API_NINJAS_KEY;
const BASE_URL = 'https://api.api-ninjas.com/v1/exercises';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const muscle = searchParams.get('muscle');
    const difficulty = searchParams.get('difficulty');

    if (!muscle || !difficulty) {
        return NextResponse.json({ error: 'Missing required parameters'}, { status: 400 });
    }

    try {
        const response = await fetch(`${BASE_URL}?muscle=${muscle}&difficulty=${difficulty}`, {
            headers: { 
                'X-Api-Key': API_KEY || '',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch exercises');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return NextResponse.json({ error: 'Failed to fetch exercises'}, { status: 500})
    }
}