import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/database'
import { error } from 'console';


export async function POST(request: NextRequest) {
    try {
        const { clientId, trainerId, className, dateTime, note, sessionType } = await request.json();

        // Validate the input
        const missingFields = [];
       
        if (!className) missingFields.push('className');
        if (!dateTime) missingFields.push('dateTime');

        const parsedDateTime = new Date(dateTime);
        if (isNaN(parsedDateTime.getTime())) {
            missingFields.push('valid dateTime');
        }
        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        // Create a new booking in the database
        const newBooking = await prisma.booking.create({
            data: {
                className,
                sessionType,
                dateTime: parsedDateTime,
                note: note || '',
                expired: false,
                expiresAt: new Date(new Date(dateTime).getTime() + 24 * 60 * 60 * 1000), // 24 hours after booking time
                client: { connect: { id: clientId}},            
                trainer: { connect: { id: trainerId } } // Assuming trainer is the same as userId
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
        const clientId = searchParams.get('clientId');
        const trainerId = searchParams.get('trainerId')

        if (!clientId && !trainerId) {
            return NextResponse.json({ error: 'Missing clientId or trainerId parameter' }, { status: 400 });
        }
        const where: any = {};
        if (clientId) where.clientId = parseInt(clientId);
        if (trainerId) where.trainerId = parseInt(trainerId);

        const bookings = await prisma.booking.findMany({
            where: clientId ? { clientId: parseInt(clientId) }: {trainerId: parseInt(trainerId!)},
            orderBy: { dateTime: 'asc' },
            include: {
                client: { select: { name: true, email: true}},
                trainer: { select: {name: true, email: true }}
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the bookings' }, { status: 500 });
    }
}