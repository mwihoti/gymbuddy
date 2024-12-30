'use client'
import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Cookies from 'js-cookie';

const  fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json() )


const Profile: React.FC = () => {
    const router = useRouter();
    const { data, error } = useSWR('/api/users', fetcher);

    const [userData, setUserData] = useState(null);


    return(
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile
