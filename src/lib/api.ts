const BASE_URL = '/api/book';

export const fetchBookings = async (clientId?: string, trainerId?: string) => {
    const url = new URL(BASE_URL, window.location.origin);
    if (clientId) url.searchParams.append('clientId', clientId);
    if (trainerId) url.searchParams.append('trainerId', trainerId);

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }

    return response.json();
};

export const createBooking = async (bookingData: {
    clientId: number;
    trainerId: number;
    className: string;
    dateTime: string;
    note?: string;
    sessionType: string;
}) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
        throw new Error('Failed to create booking')
    }
    return response.json();
}
