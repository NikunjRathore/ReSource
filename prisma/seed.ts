import "dotenv/config"
import { randomBytes, scryptSync } from "node:crypto"
import { PrismaClient } from "../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { ItemCategory, ListingStatus, Role } from "../generated/prisma/enums"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const ITEM_COUNT = 30_000
const BATCH_SIZE = 5_000

const TAGS = [
  "food",
  "warm",
  "clothing",
  "books",
  "toys",
  "furniture",
  "household",
  "community",
  "reusable",
  "essentials",
] as const

const tagPairs: string[][] = []
for (let first = 0; first < TAGS.length; first += 1) {
  for (let second = first + 1; second < TAGS.length; second += 1) {
    tagPairs.push([TAGS[first], TAGS[second]])
  }
}

const sampleWords = ["jacket", "blanket", "rice bag", "textbook", "wooden chair", "heater", "steel bottle", "notebook bundle"]
const categories = [ItemCategory.FOOD, ItemCategory.CLOTH, ItemCategory.BOOK, ItemCategory.FURNITURE, ItemCategory.TOY]
const statuses = [ListingStatus.AVAILABLE, ListingStatus.CLAIMED, ListingStatus.COMPLETED]

async function deleteExistingData() {
  console.log("Cleaning up old database records...")
  await prisma.claim.deleteMany().catch(() => {})
  await prisma.session.deleteMany().catch(() => {})
  await prisma.item.deleteMany().catch(() => {})
  await prisma.user.deleteMany().catch(() => {})
}

async function main() {
  await deleteExistingData()
  console.log("Deleted all existing claims, sessions, items, and users.")

  console.log("Creating 200 test donors...")
  const donors = []
  for (let i = 1; i <= 200; i++) {
    const salt = randomBytes(16).toString("hex")
    const passwordHash = `scrypt$${salt}$${scryptSync("password123", salt, 64).toString("hex")}`
    donors.push({
      id: `donor-${i}`,
      email: `donor${i}@resource.local`,
      name: `Donor User ${i}`,
      passwordHash,
      role: Role.DONOR_INDIVIDUAL,
    })
  }
  await prisma.user.createMany({ data: donors })

  console.log("Generating 30,000 items with dynamic details and string tags...")
  for (let batchStart = 0; batchStart < ITEM_COUNT; batchStart += BATCH_SIZE) {
    const batchCount = Math.min(BATCH_SIZE, ITEM_COUNT - batchStart)
    const items = Array.from({ length: batchCount }, (_, offset) => {
      const itemIndex = batchStart + offset
      const word = sampleWords[itemIndex % sampleWords.length]
      const donorId = `donor-${(itemIndex % 200) + 1}`

      return {
        id: `item-${itemIndex}`,
        title: `Donation Item #${itemIndex}: Gently Used ${word}`,
        description: `High quality ${word} in good condition, inspected and ready for community support.`,
        category: categories[itemIndex % categories.length],
        quantity: (itemIndex % 5) + 1,
        unit: "piece",
        status: statuses[itemIndex % statuses.length],
        donorId: donorId,
        tags: tagPairs[itemIndex % tagPairs.length],
      }
    })

    await prisma.item.createMany({ data: items })
    console.log(`Created ${batchStart + batchCount}/${ITEM_COUNT} items.`)
  }

  console.log("Database seeding completed successfully!")
}

main()
  .catch((error: unknown) => {
    console.error("Database seeding failed:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })