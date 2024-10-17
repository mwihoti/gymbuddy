'use client'
import React, { useState, useEffect } from 'react';
import { fetchBookings, createBooking } from '../lib/api';

type ClassType = 'Cardio' | 'Boxing' | 'Weightlifting' | 'Yoga';
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface Class {
  type: ClassType;
  startTime: string;
  endTime: string;
}

interface Booking {
  id: number;
  className: ClassType;
  dateTime: string;
  note: string;
  expired: boolean;
}

type Timetable = Record<DayOfWeek, Class[]>;

const generateTimetable = (): Timetable => {
  const timetable: Timetable = {
    'Monday': [],
    'Tuesday': [],
    'Wednesday': [],
    'Thursday': [],
    'Friday': [],
    'Saturday': [],
    'Sunday': [],
  };

  const weekdayClasses: Class[] = [
    { type: 'Cardio', startTime: '05:00', endTime: '07:00' },
    { type: 'Boxing', startTime: '12:00', endTime: '14:00' },
    { type: 'Weightlifting', startTime: '15:00', endTime: '17:00' },
    { type: 'Cardio', startTime: '18:00', endTime: '20:00' },
    { type: 'Yoga', startTime: '20:00', endTime: '22:00' },
  ];

  const weekendClasses: Class[] = [
    { type: 'Cardio', startTime: '06:00', endTime: '07:30' },
    { type: 'Yoga', startTime: '07:30', endTime: '09:00' },
  ];

  (Object.keys(timetable) as DayOfWeek[]).forEach((day) => {
    timetable[day] = day === 'Saturday' || day === 'Sunday' ? weekendClasses : weekdayClasses;
  });

  return timetable;
};

const Classes: React.FC<{clientId: string, trainerId: string}> = ({ clientId, trainerId}) => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [note, setNote] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timetable, setTimetable] = useState<Timetable>({} as Timetable);
  const [showTrainerBooking, setShowTrainerBooking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimetable(generateTimetable());
    fetchBookingsData();
  }, [clientId, trainerId]);

  // Fetch bookings from the API
  const fetchBookingsData = async () => {
    try {
      const data = await fetchBookings(clientId, trainerId);
      setBookings(data);
      
    } catch (err) {
      setError('Failed to load bookings, Please try again later');
    }
  }

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedClass) return;

    try {
      const newBooking = await createBooking({
        clientId: parseInt(clientId),
        trainerId: parseInt(trainerId),
        className: selectedClass.type,
        dateTime: `${selectedDay} ${selectedClass.startTime}`,
        note,
        sessionType: 'regular',
      });

      setBookings([...bookings, newBooking]);
      setSelectedClass(null);
      setNote('');
      setError(null);
      alert('Class booked successfully!')
    } catch (err) {
      setError('Failed to book class. Please try again later.');
    }
  };

  const handleTrainerBooking = () => {
    alert('Trainer session booked successfully!');
    setShowTrainerBooking(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Class Booking System</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Timetable</h2>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
          className="border p-2 rounded mb-4"
        >
          {(Object.keys(timetable) as DayOfWeek[]).map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <ul className="space-y-2">
          {timetable[selectedDay]?.map((classItem, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedClass(classItem)}
            >
              <span>{classItem.type}</span>
              <span>{`${classItem.startTime} - ${classItem.endTime}`}</span>
            </li>
          ))}
        </ul>
      </div>

      {selectedClass && (
        <form onSubmit={handleBooking} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Book a Class</h2>
          <p className="mb-4">
            Selected Class: {selectedClass.type} on {selectedDay} at {selectedClass.startTime}
          </p>
          <div className="mb-4">
            <label className="block mb-2">Note (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border p-2 rounded w-full"
            ></textarea>
          </div>
          <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded">
            Book Class
          </button>
        </form>
      )}

      <button
        onClick={() => setShowTrainerBooking(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-8"
      >
        Book a Session with a Trainer
      </button>

      {showTrainerBooking && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Book a Trainer</h2>
          <p className="mb-4">Select a time and date for your training session:</p>
          <input type="datetime-local" className="border p-2 rounded mb-4" />
          <button
            onClick={handleTrainerBooking}
            className="bg-emerald-500 text-white py-2 px-4 rounded"
          >
            Book Trainer
          </button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Previous Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className={`p-4 border rounded mb-4 ${
                booking.expired ? 'bg-red-200' : 'bg-green-200'
              }`}
            >
              <p>
                <strong>Class:</strong> {booking.className}
              </p>
              <p>
                <strong>Date:</strong> {new Date(booking.dateTime).toLocaleDateString()}
              </p>
              <p>{booking.note ? <strong>Note:</strong> : null} {booking.note}</p>
              <p>{booking.expired ? 'Expired' : 'Upcoming'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Classes;