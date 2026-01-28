import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const url = new URL(process.env.DATABASE_URL!)

const pool = new Pool({
  host: '98.89.62.209',
  port: 5432,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: {
    servername: url.hostname,
    rejectUnauthorized: false,
  }
})

// Force recreate in dev to pick up changes
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = undefined;

const adapter = new PrismaPg(pool);

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
