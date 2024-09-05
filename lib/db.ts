import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(search: string, offset: number) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        // { username: { contains: search, mode: 'insensitive' } }
      ]
    },
    skip: offset,
    take: 10,
    include: {
      _count: {
        select: { listings: true},
      },
    },
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
    reservations: 0, // Placeholder, replace with actual value if needed
    posts: 0, // Placeholder, replace with actual value if needed
    comments: 0, // Placeholder, replace with actual value if needed
    badges: [], // Placeholder, replace with actual value if needed
    points: user.points || 0, // Placeholder, replace with actual value if needed
  }));

  return { users: formattedUsers, newOffset };
}

export async function getListings(search: string, offset: number) {
  const listings = await prisma.listing.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { locationValue: { contains: search, mode: 'insensitive' } }
      ]
    },
    skip: offset,
    take: 10,
    include: {
      user: true,
      reservations: true,
      comment: true,
      points: true,
    },
  });

  const newOffset = offset + listings.length;

  const formattedListings = listings.map((listing) => ({
    id: listing.id,
    title: listing.title,
    description: listing.description,
    imageSrc: listing.imageSrc,
    createdAt: listing.createdAt,
    category: listing.category,
    guestCount: listing.guestCount,
    locationValue: listing.locationValue,
    locationDetails: listing.locationDetails,
    highlight: listing.highlight,
    whatsIncluded: listing.whatsIncluded,
    requirement: listing.requirement,
    difficulty: listing.difficulty,
    price: listing.price,
    public: listing.public,
    capacityLimit: listing.capacityLimit,
    user: listing.user,
    reservations: listing.reservations.length, // Replace with actual reservation count if needed
    comments: listing.comment.length, // Replace with actual comment count if needed
    points: listing.points.length, // Replace with actual points count if needed
  }));

  return { listings: formattedListings, newOffset };
}

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV != 'development') globalThis.prisma = client

export { prisma as db };

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;