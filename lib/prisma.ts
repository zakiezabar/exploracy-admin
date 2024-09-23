import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, create a new PrismaClient instance
  prisma = new PrismaClient();
} else {
  // In development, reuse the PrismaClient instance across hot-reloads
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
