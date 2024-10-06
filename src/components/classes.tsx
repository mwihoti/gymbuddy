'use client'
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';


const Classes: React.FC = () => {
    
    const router = useRouter();
    const [className, setClassName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [ note, setNote] = useState('');
    const [ bookings, setBookings] = useState([]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated'){
            router.push('/api/auth/signin');

        }
    }, [status]);

    // Fetch user's previous bookings
    useEffect(() => {
        if (session?.user) {
          fetch('/api/bookings')
            .then((res) => res.json())
            .then((data) => setBookings(data));

        }
    }, [session]);

    // Handle booking submission
    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: session?.user?.email || '',
                className,
                dateTime,
                note,

            }),
        });
        if (response.ok) {
            alert('Class booked successfully');
            setClassName('');
            setDateTime('');
            setNote('');

            // Refresh bookings list
             const updatedBookings = await response.json();
             setBookings(updatedBookings);

        } else {
            alert('Failed to book class');
        }
    }

  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-4xl font-bold text-center mb-6'>Book a class</h1>
    </div>
  )
}

export default Classes