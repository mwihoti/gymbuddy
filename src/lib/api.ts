const BASE_URL = '/api/book';

export const fetchBookings = async () => {
   
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }

    return response.json();
};

export const createBooking = async (bookingData: {
  
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
        const errorData = await response.json();
        console.error('Booking creation failed:', errorData);
        throw new Error(`Failed to create booking: ${errorData.error || response.statusText}`);
    }
    return response.json();
}
