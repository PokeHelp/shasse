import {PrismaClient} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient = globalForPrisma.prisma || new PrismaClient(
    {
        // Debugage des query
        // log: ['query', 'info', 'warn', 'error']
    }
);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;