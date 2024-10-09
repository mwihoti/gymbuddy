import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/database";


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const trainerId = searchParams.get('trainerId');

        if (!trainerId) {
            return NextResponse.json({ error: 'Missing trainerId parameter' }, { status: 400})
        }

        const bookings = await prisma.booking.findMany({
            where: { trainerId: parseInt(trainerId)},
            include: {
                client: { select: { name: true}},
            },
            orderBy: { dateTime: 'asc'},
        });

        const formattedBookings = bookings.map(booking => ({
            id: booking.id,
            clientName: booking.client.name,
            date: booking.dateTime.toISOString().split('T')[0],
            time: booking.dateTime.toTimeString().split(' ')[0],
            sessionType: booking.className,
            status: booking.status,
        }));

        return NextResponse.json(formattedBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'An error occured while fetching the bookings'}, {status: 500})
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { bookingId, status } = await request.json();
        
        if (!bookingId || !status) {
            return NextResponse.json({ error: 'Missing bookingId or status'}, { status: 400})
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId},
            data: { status },
            include: {
                client: { select: { name: true }},
            }
        });

        const formattedBooking = {
            id: updatedBooking.id,
            clientName: updatedBooking.client.name,
            date: updatedBooking.dateTime.toISOString().split('T')[0],
            time: updatedBooking.dateTime.toTimeString().split(' ')[0],
            sessionType: updatedBooking.className,
            status: updatedBooking.status,
        };
        return NextResponse.json(formattedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'An error occurred while updating the booking'}, {status: 500})
    }
}