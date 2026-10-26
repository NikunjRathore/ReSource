import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function runBenchmarks() {
  console.log("==========================================")
  console.log("    POSTGRESQL EXPLAIN ANALYZE BENCHMARK  ")
  console.log("==========================================\n")

  // 1. Donor Dashboard Query (Donor viewing their items by status)
  console.log("1. Running EXPLAIN ANALYZE for Donor Dashboard Query...")
  const donorExplain = await prisma.$queryRaw`
    EXPLAIN ANALYZE 
    SELECT * FROM "Item" 
    WHERE "donorId" = 'donor-42' AND "status" = 'AVAILABLE';
  `
  console.log(donorExplain)

  console.log("\n------------------------------------------\n")

  // 2. NGO Tag-Based Marketplace Filter (NGO filtering available items by tag)
  console.log("2. Running EXPLAIN ANALYZE for NGO Tag-Based Filtering...")
  const ngoTagExplain = await prisma.$queryRaw`
    EXPLAIN ANALYZE 
    SELECT * FROM "Item" 
    WHERE tags @> ARRAY['warm'] AND status = 'AVAILABLE';
  `
  console.log(ngoTagExplain)

  console.log("\n==========================================")
  console.log("           BENCHMARK COMPLETE             ")
  console.log("==========================================\n")
}

runBenchmarks()
  .catch(console.error)
  .finally(() => prisma.$disconnect())