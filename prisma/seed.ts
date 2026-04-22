import dotenv from  "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: `${process.env.DATABASE_URL}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.gameOfLifeStats.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      deaths: BigInt(0),
      rebirths: BigInt(0)
    }
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
