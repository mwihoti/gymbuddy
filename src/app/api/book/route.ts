import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';


export async function POST(request: NextRequest) {
    try {
        const { userId, className, dateTime, note } = await request.json();

        // Validate the input
        if (!userId || !className || !dateTime) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create a new booking in the database
        const newBooking = await prisma.booking.create({
            data: {
                className,
                dateTime: new Date(dateTime),
                note: note || '',
                expired: false,
                expiresAt: new Date(new Date(dateTime).getTime() + 24 * 60 * 60 * 1000), // 24 hours after booking time
                userId: userId
            },
        });

        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'An error occurred while creating the booking' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { dateTime: 'asc' }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the bookings' }, { status: 500 });
    }
}