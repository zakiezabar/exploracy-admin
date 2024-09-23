'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Modal from '@/components/ui/modal';
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

const ReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingReservationId, setEditingReservationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/reservations');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        // console.error('Failed to fetch reservations', error);
      }
    };

    fetchReservations();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}/approve`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setReservations((prev) =>
          prev.map((res) => (res.id === id ? { ...res, status: 'accepted' } : res))
        );
      }
    } catch (error) {
      // console.error('Failed to approve reservation', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}/reject`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setReservations((prev) =>
          prev.map((res) => (res.id === id ? { ...res, status: 'rejected' } : res))
        );
      }
    } catch (error) {
      // console.error('Failed to reject reservation', error);
    }
  };

  const handleOpenModal = (id: string) => {
    setEditingReservationId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingReservationId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-1 flex-col p-4 md:p-6">
      <Heading title="Reservations" subtitle="Manage all reservations" />
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
                <div className="mt-4 flex space-x-4 justify-end">
                  <Button
                    onClick={() => handleOpenModal(reservation.id)}
                    variant={'default'}
                    size={'sm'}
                  >
                    Edit
                  </Button>
                  {reservation.status !== 'accepted' ? (
                    <Button
                      onClick={() => handleApprove(reservation.id)}
                      variant={'secondary'}
                      size={'sm'}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleReject(reservation.id)}
                      variant={'secondaryOutline'}
                      size={'sm'}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingReservationId && (
        <Modal
          title="Edit Reservation"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          body={
            <div>
              {/* Reservation edit form goes here */}
              <p>Edit reservation functionality will be implemented here.</p>
            </div>
          }
          fullscreen={true}
        />
      )}
    </div>
  );
};

export default ReservationPage;