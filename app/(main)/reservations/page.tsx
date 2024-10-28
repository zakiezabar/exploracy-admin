'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
// import Modal from '@/components/ui/modal';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';

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

const ReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState('all');
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [editingReservationId, setEditingReservationId] = useState<string | null>(null);
  // const router = useRouter();

  // Fetch reservations based on the selected filter
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/reservations');
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        
        // Filter based on status
        const filteredReservations = filter === 'all' 
          ? data 
          : data.filter((res: Reservation) => res.status === filter);
        setReservations(filteredReservations);
      } catch (error) {
        console.error('Failed to fetch reservations', error);
      }
    };

    fetchReservations();
  }, [filter]);

  // Function to handle marking a reservation as approved
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (response.ok) {
        setReservations((prev) =>
          prev.map((res) => (res.id === id ? { ...res, status: 'approved' } : res))
        );
      } else {
        console.log('Failed to approve reservation');
      }
    } catch (error) {
      console.error('Error approving reservation', error);
    }
  };

  // Function to handle marking a reservation as completed
  const handleComplete = async (id: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      if (response.ok) {
        // Filter out the completed reservation from the current list
        setReservations((prev) => prev.filter((res) => res.id !== id));
      } else {
        console.log('Failed to complete reservation');
      }
    } catch (error) {
      console.error('Error completing reservation', error);
    }
  };

  return (
    <div className="w-full flex flex-1 flex-col p-4 md:p-6">
      <Heading title="Reservations" subtitle="Manage all reservations" />

      {/* Filter Dropdown */}
      <select
        className="mb-4 p-2 border rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
        <option value="completed">Completed</option>
      </select>

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
                <div className="flex flex-row justify-between">
                  <h2 className="text-md font-semibold">{reservation.listing.title}</h2>
                </div>
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
                
                {/* Action Buttons */}
                <div className="mt-4 flex space-x-4 justify-end">
                  {reservation.status === 'pending' && (
                    <Button
                      onClick={() => handleApprove(reservation.id)}
                      variant={'secondary'}
                      size={'sm'}
                    >
                      Approve
                    </Button>
                  )}
                  {reservation.status === 'approved' && (
                    <Button
                      onClick={() => handleComplete(reservation.id)}
                      variant={'secondary'}
                      size={'sm'}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationPage;