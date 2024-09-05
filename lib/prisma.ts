// Import the PrismaClient class from the Prisma Client package
import { PrismaClient } from '@prisma/client';

// Declare a PrismaClient instance
let prisma: PrismaClient;

// Check if the environment is production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); // Create a new PrismaClient instance in production
} else {
  // Prevent multiple instances of PrismaClient in development
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

// Export the PrismaClient instance
export default prisma;