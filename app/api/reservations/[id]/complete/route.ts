// /app/api/reservations/[id]/complete/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path if your prisma client is elsewhere

// Function to handle marking a reservation as completed
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extract reservation ID from the request URL

    // Update the reservation status to 'completed'
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status: 'completed' },
    });

    // Return the updated reservation as a response
    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error('Failed to complete reservation:', error);
    return NextResponse.json({ error: 'Failed to complete reservation' }, { status: 500 });
  }
}
