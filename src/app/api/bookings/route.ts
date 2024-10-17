import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/database";

export async function POST(request: NextRequest) {
    try {
        const { clientId, trainerId, className, dateTime, note, sessionType } = await request.json();

        // Validate the input
        const missingFields = [];
        if (!clientId) missingFields.push('clientId');
        if (!trainerId) missingFields.push('trainerId');
        if (!className) missingFields.push('className');
        if (!dateTime) missingFields.push('dateTime');

        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        // Create a new booking in the database
        const newBooking = await prisma.booking.create({
            data: {
                className,
                sessionType,
                dateTime: new Date(dateTime),
                note: note || '',
                expired: false,
                expiresAt: new Date(new Date(dateTime).getTime() + 24 * 60 * 60 * 1000),
                client: { connect: { id: parseInt(clientId) }},            
                trainer: { connect: { id: parseInt(trainerId) } }
            },
            include: {
                client: { select: { name: true, email: true}},
                trainer: { select: { name: true, email: true}}
            }
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