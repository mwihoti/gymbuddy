'use client';

import React, { useState, useEffect } from 'react';
import { fetchBookings, updateBookingStatus } from '../lib/api';

interface Booking {
  id: number;
  client: {name: string | null; email: string | null};
  dateTime: string;
  className: string;
  sessionType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  expired: boolean;
}


export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

    const loadBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchBookings(); // Use the imported fetchBookings function
        setBookings(data);
      } catch (err) {
        setError('Failed to load bookings. Please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    const handleStatusChange = async (bookingId: number, newStatus: Booking['status']) => {
      try {
        await updateBookingStatus(bookingId, newStatus);
        setBookings(bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ));
      } catch (err) {
        setError('Failed to update booking status. Please try again.');
      }
    }

  const FetchBookings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/book');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings. Please try again later')
    } finally {
      setIsLoading(false);
    }
  }
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString();
  };
  
  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  



  const filteredBookings = filter === 'all' ? bookings : bookings.filter(booking => booking.status === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Your Bookings</h1>
      
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by status:</label>
        <select 
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Client Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Session Type</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map(booking => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.client.name || booking.client.email}</td>
              <td className="border p-2">{formatDate(booking.dateTime)}</td>
      <td className="border p-2">{formatTime(booking.dateTime)}</td>
      <td className="border p-2">{booking.className}</td>
              <td className="border p-2">{booking.sessionType}</td>
              <td className="border p-2">{booking.status}</td>
              <td className="border p-2">
                <select 
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                  className="border rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirm</option>
                  <option value="cancelled">Cancel</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}