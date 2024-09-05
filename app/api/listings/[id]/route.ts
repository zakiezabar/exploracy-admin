import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

// Handle GET requests to fetch a single listing by ID
export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  if (!id || !ObjectId.isValid(id)) { // Validate the ID
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: String(id) },
    });

    if (listing) {
      return NextResponse.json(listing);
    } else {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to fetch listing' }, { status: 500 });
  }
}

// Handle PUT requests to update a listing by ID
export async function PUT(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();
  const body = await request.json();
  const { title, description, price, imageSrc, category, guestCount, locationValue, userId } = body;

  if (!id || !ObjectId.isValid(id)) { // Validate the ID
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  // Validate required fields
  if (!title || !description || !price || !imageSrc || !category || !guestCount || !locationValue) {
    return NextResponse.json({ error: 'Title, description, price, imageSrc, category, guestCount, and locationValue are required' }, { status: 400 });
  }

  try {
    const updatedListing = await prisma.listing.update({
      where: { id: String(id) },
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
    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update listing' }, { status: 500 });
  }
}

// Handle DELETE requests to delete a listing by ID
export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  if (!id || !ObjectId.isValid(id)) { // Validate the ID
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const deletedListing = await prisma.listing.delete({
      where: { id: String(id) },
    });
    return NextResponse.json(deletedListing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to delete listing' }, { status: 500 });
  }
}