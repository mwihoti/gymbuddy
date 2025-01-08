import { NextResponse } from "next/server";
import {prisma, getDataWithCache} from "../../../lib/database";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({error: "User ID is required"}, {status: 400});

    }
    try {   
        
        console.log(`user:${userId}`);
        const user = await getDataWithCache(
            `user:${userId}`,
            () => prisma.user.findUnique({
                where: { id: parseInt(userId) },
            })
        );
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json({ user});

    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}