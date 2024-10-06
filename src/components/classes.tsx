import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { setEngine } from 'crypto';

const Classes: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [className, setClassName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [ note, setNote] = useState('');
    const [ bookings, setBookings] = useState([]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status == 'unauthenticated'){
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

  return (
    <div>classes</div>
  )
}

export default Classes