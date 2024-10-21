import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { prisma } from "./database";

export async function getCurrentUser(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;

    try {
        const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string};
        const user = await prisma.user.findUnique({where: { id: Number(decoded.userId) } });
        return user;

    } catch (error) {
        return null;
    }
    
}