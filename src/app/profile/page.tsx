'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Assuming the user ID is stored in a cookie or session
                const userId = localStorage.getItem('userId'); // Or fetch it from cookies or session
                if (!userId) {
                    setError('User not logged in.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`/api/users?userId=${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch user data.');
                }

                setUserData(data.user);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <h3 className="text-center">Loading...</h3>;
    }

    if (error) {
        return <h3 className="text-center text-red-500">Error: {error}</h3>;
    }

    if (!userData) {
        return <h3 className="text-center">No user data available.</h3>;
    }

    return (
        <div>
            <h3 className="text-center bold underline text-3xl">
                Welcome {userData.username || userData.email}
            </h3>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;
