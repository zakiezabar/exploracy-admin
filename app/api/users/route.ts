import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query || query.length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
      },
      take: 10, // Limit the number of results
    });

    return NextResponse.json(users);
  } catch (error) {
    // console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Unable to fetch users' }, { status: 500 });
  }
}

// Handles DELETE requests to delete a user
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Delete the user with the given ID
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    // console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Unable to delete user' }, { status: 500 });
  }
}