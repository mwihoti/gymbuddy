import { NextResponse } from "next/server";

type Booking = {
    id: number;
    className: string;
    dateTime: string;
    note: string;
    expired: boolean;
};

const mockBookings: Booking[] = [
    { id: 1, className: 'Cardio', dateTime: '2024-10-07T10:00:00', note: '', expired: false },
  { id: 2, className: 'Yoga', dateTime: '2024-10-08T15:00:00', note: 'Bring your own mat', expired: false },
  { id: 3, className: 'Boxing', dateTime: '2024-10-09T18:00:00', note: '', expired: false },
];

export async function GET() {
    return NextResponse.json(mockBookings);
}