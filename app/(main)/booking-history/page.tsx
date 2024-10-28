'use client';

import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Image from 'next/image';

interface Reservation {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  totalPrice: number;
  user?: {
    name?: string;
  };
  listing: {
    title: string;
    description: string;
    imageSrc: string;
  };
}

const BookingHistoryPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Fetch completed reservations
  useEffect(() => {
    const fetchCompletedReservations = async () => {
      try {
        const response = await fetch('/api/reservations');
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data.filter((res: Reservation) => res.status === 'completed')); // Filter completed reservations
      } catch (error) {
        console.error('Failed to fetch completed reservations', error);
      }
    };

    fetchCompletedReservations();
  }, []);

  return (
    <div className="w-full flex flex-1 flex-col p-4 md:p-6">
      <Heading title="Booking History" subtitle="View completed reservations" />
      <ul className="space-y-2">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="bg-white p-4 rounded-lg border">
            <div className="flex flex-row gap-4">
              <div className="rounded-md w-24 h-24">
                {reservation.listing.imageSrc && (
                  <Image
                    src={reservation.listing.imageSrc}
                    alt={reservation.listing.title}
                    className="rounded-lg object-cover"
                    width={800}
                    height={800}
                  />
                )}
              </div>
              <div className="flex flex-col w-full">
                <h2 className="text-md font-semibold">{reservation.listing.title}</h2>
                <p className="text-md text-gray-700">{reservation.listing.description}</p>
                <p className="text-sm text-slate-500">
                  Reserved by: {reservation.user?.name || 'Unknown'}
                </p>
                <p className="text-sm text-slate-500">
                  From: {new Date(reservation.startDate).toLocaleString()} - To:{' '}
                  {new Date(reservation.endDate).toLocaleString()}
                </p>
                <p className="text-sm text-slate-500">
                  Status: <strong>{reservation.status}</strong>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistoryPage;
