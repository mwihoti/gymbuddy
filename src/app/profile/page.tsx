'use client';

import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';



const Profile: React.FC = () => {
    const router = useRouter();

   const [userData, setUserData] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [editMode, setEditMode] = useState(false);
   const [formData, setFormData] = useState({ name: '', email: ''});

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users', { method: 'GET'});
        if (response.status === 401) {
          router.push('/auth');
          return;
        }
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data.');
        }
        setUserData(data.user);
        setFormData({ name: data.user.name, email: data.user.email});
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
   }, [router]);

   // handle input changes

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
   }

   // update profile
   const handleUpdate = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();
      alert(data.message);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    };

    // Delete account
    const handleDelete = async () => {
      const confirmDelete = confirm("Are you sure you want to delete your account?  This action can't be undone.");
      if (confirmDelete) {
        try {
          const res = await fetch('/api/users', {method: 'DELETE'});

          if (!res.ok) {
            throw new Error('Failed to delete account');
          }
          const data = await res.json();
          alert(data.message);
          router.push('/auth');
        } catch (error) {
          console.error('Error deleting account:', error);
        } 
    }
  };

   if (loading) return <p>Loadng...</p>;
   if (!userData) return <p>{error || 'User not found'}</p>;


    return (
        <div>
           <h1 className='text-2xl font-bold mb-4'>User Profile</h1>
            <h3 className="text-center bold underline text-3xl">
                Welcome {userData.username || userData.email}
            </h3>

            {!editMode ? (
              <>
              <p className='mb-2'>
                <strong>Name: </strong> {userData.name}
              </p>
              <p className='mb-4'>
                <strong>Email: </strong> {userData.email}
              </p>
              <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit Profile
          </button>
          <button 
          onClick={handleDelete}
          className='bg-red-500 text-white px-4 py-2 rounded'>Delete Account</button>
              </>
            ): (
              <>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500'/>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500'/>
              </div>
              <button onClick={()=> setEditMode(false)} className="bg-gray-500 text-white px-4 py-2">Cancel</button>
              </>
            )}
           
        </div>
    );
};

export default Profile;
