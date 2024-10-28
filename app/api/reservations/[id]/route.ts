import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handler for PATCH requests to update the reservation status
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Correctly access the ID from params
  const { status } = await req.json(); // Parse the body to get the status

  if (!id) {
    return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 });
  }

  try {
    // Validate the status before updating
    if (status !== 'approved' && status !== 'completed') {
      return NextResponse.json({ error: 'Invalid status update' }, { status: 400 });
    }

    // Update the reservation status
    const updatedReservation = await prisma.reservation.update({
      where: { id: String(id) },
      data: { status },
      include: { user: true }, // Ensure user data is included
    });

    // Award points to the user if marked as completed
    if (status === 'completed') {
      const userId = updatedReservation.userId;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            points: { increment: 10 },
          },
        });
        console.log(`Points awarded to user with ID: ${userId}`);
      } else {
        console.error('User ID not found for this reservation');
      }
    }

    // Return the updated reservation
    return NextResponse.json(updatedReservation, { status: 200 });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}