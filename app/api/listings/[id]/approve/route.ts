import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ObjectId } from 'mongodb';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { approved } = body;

    if (typeof approved !== 'boolean') {
      return NextResponse.json({ error: 'Invalid approval status' }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: { approved },
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update approval status' }, { status: 500 });
  }
}
