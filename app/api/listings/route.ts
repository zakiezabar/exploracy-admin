import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle POST request to create a new listing
export async function POST(request: NextRequest) {
  const { title, description, price, imageSrc, category, guestCount, locationValue, userId } = await request.json();

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        imageSrc,
        category,
        guestCount,
        locationValue,
        userId,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    // console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

// Handle GET request to fetch all listings with related user data
export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        user: true,  // Include related user data
      },
    });
    return NextResponse.json(listings);
  } catch (error) {
    // console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

// Handle DELETE request to delete a listing by ID
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing listing ID' }, { status: 400 });
  }

  try {
    const listing = await prisma.listing.delete({
      where: { id },
    });
    return NextResponse.json(listing);
  } catch (error) {
    // console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}

// Handle PATCH request to update a listing by ID
export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing listing ID' }, { status: 400 });
  }

  const { title, description, price, imageSrc, category, guestCount, locationValue, userId, publicStatus } = await request.json();

  try {
    const listing = await prisma.listing.update({
      where: { id },
      data: {
        title,
        description,
        price,
        imageSrc,
        category,
        guestCount,
        locationValue,
        userId,
        public: publicStatus,  // Handle public status update
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    // console.error('Error updating listing:', error);
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
  }
}