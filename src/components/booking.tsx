'use client';

import React, { useState, useEffect } from 'react';
import { fetchBookings } from '../lib/api';

interface Booking {
  id: number;
  clientName: string;
  date: string;
  time: string;
  sessionType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const mockBookings: Booking[] = [
  { id: 1, clientName: "Alice Johnson", date: "2024-10-07", time: "10:00 AM", sessionType: "Cardio", status: "pending" },
  { id: 2, clientName: "Bob Williams", date: "2024-10-08", time: "2:00 PM", sessionType: "Strength Training", status: "confirmed" },
  { id: 3, clientName: "Charlie Brown", date: "2024-10-09", time: "11:00 AM", sessionType: "Yoga", status: "pending" },
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    loadBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings?trainerId=2');
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

  const handleStatusChange = (bookingId: number, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
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
              <td className="border p-2">{booking.clientName}</td>
              <td className="border p-2">{booking.date}</td>
              <td className="border p-2">{booking.time}</td>
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