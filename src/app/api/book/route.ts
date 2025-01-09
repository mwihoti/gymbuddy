import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/database'
import { getCurrentUser } from '@/lib/auth';


export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 404 });
        }
        const {  className, dateTime, note, sessionType } = await request.json();

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
                client: { connect: { id: user.id}}, 
                trainer: { connect: { id: user.id} }           
                
            },
            include: {
                client: { select: { name: true, email: true}},
                
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
        const user = await getCurrentUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 404 });
        }
        
        const bookings = await prisma.booking.findMany({
            where: { clientId: user.id },
            orderBy: { dateTime: 'asc' },
            include: {
                client: { select: { name: true, email: true}},
             
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the bookings' }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const user = await getCurrentUser(request);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403});
        }

        const { searchParams } = new URL(request.url);
        const targetBookingId = searchParams.get('bookingId');

        const { bookingId, status } = await request.json();
        
        if (!bookingId || !status) {
            return NextResponse.json({ error: 'Missing bookingId or status'}, { status: 400})
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId},
            select: { client: true}
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found'}, { status: 404});
        }

        // Allow update if user is a trainer
        if (user.role !== 'TRAINER' && booking.client.id !== user.id) {
            return NextResponse.json({ error: "You don't have permission to update booking " }, { status: 403});
        }
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId},
           data: { status },
            include: {
                client: { select: { name: true, email: true}},
            }
        });

        const formattedBooking = {
            id: updatedBooking.id,
            clientName: updatedBooking.client.name || updatedBooking.client.email || 'Unknown',
            date: updatedBooking.dateTime.toISOString().split('T')[0],
            time: updatedBooking.dateTime.toTimeString().split(' ')[0],
            className: updatedBooking.className,
            sessionType: updatedBooking.sessionType,
            status: updatedBooking.status,
        };      
        return NextResponse.json(formattedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'An error occurred while updating the booking'}, {status: 500})
    }
}