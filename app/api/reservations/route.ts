import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure prisma is correctly set up and imported

export async function GET() {
  try {
    // Fetch reservations including user and listing details
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true, // Include the related user details
        listing: true, // Include the related listing details
      },
    });

    // console.log('Fetched Reservations:', reservations); // Log the reservations for debugging

    // Respond with the reservations data
    return NextResponse.json(reservations);
  } catch (error) {
    // console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}
