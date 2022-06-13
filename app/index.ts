import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const allOTB = await prisma.oTBSampleHistory.findMany()
  console.log(allOTB)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  export default {
    main
  }