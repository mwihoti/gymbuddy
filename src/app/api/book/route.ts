import { NextRequest, NextResponse } from 'next/server';

type Booking = {
    id: number;
    className: string;
    dateTime: string;
    note: string;
    expired: boolean;
};

let bookings: Booking[] = [];

export async function POST(request: NextRequest) {
    const { className, dateTime, note, expired} = await request.json();
    const newBooking: Booking = {
        id: Date.now(),
        className,
        dateTime,
        note,
    }
}