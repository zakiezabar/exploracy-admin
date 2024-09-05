import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique ({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique ({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

const prisma = new PrismaClient();

export const getUsers = async (search: string, offset: number) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    },
    include: {
      _count: {
        select: { listings: true, reservations: true},
      },
    },
    skip: offset,
    take: 10,
  });

  const newOffset = offset + users.length;

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    createdAt: user.createdAt,
    role: user.role,
    listings: user._count.listings,
    reservations: user._count.reservations, // Placeholder, replace with actual value if needed
    posts: 0, // Placeholder, replace with actual value if needed
    comments: 0, // Placeholder, replace with actual value if needed
    badges: [], // Placeholder, replace with actual value if needed
    points: user.points || 0, // Placeholder, replace with actual value if needed
  }));

  return { users: formattedUsers, newOffset };
};