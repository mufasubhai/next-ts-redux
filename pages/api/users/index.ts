import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleUserData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

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


export default handler