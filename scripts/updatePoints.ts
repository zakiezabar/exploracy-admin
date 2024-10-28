// /scripts/updatePoints.ts
import prisma from '@/lib/prisma'; // Ensure the correct path to your Prisma client

async function updatePointsForExistingUsers() {
  try {
    // Update users where points are explicitly null using the correct Prisma filtering
    const updatedUsers = await prisma.user.updateMany({
      where: {
        points: {
          not: { gte: 0 }, // This effectively finds rows where points are null
        },
      },
      data: {
        points: 0, // Set points to 0 where it was null
      },
    });

    console.log(`Updated ${updatedUsers.count} users with null points to 0.`);
  } catch (error) {
    console.error('Error updating points:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client when done
  }
}

updatePointsForExistingUsers();