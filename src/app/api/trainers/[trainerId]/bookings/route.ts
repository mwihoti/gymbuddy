import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { trainerId: string }}
) {
    const trainerId = parseInt(params.trainerId);

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                trainerId: trainerId,
            },
            include: {
                client: {
                select: {
                    name: true,
                    email: true,
                },
                },
            },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error Fetching bookings:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching booking'},
            { status: 500}
        );
    } finally {
        await prisma.$disconnect();
    }
}