import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'
import { PrismaClient } from '@prisma/client'


  const prisma = new PrismaClient()



export default async function handle(req, res) {
  console.log("HERE")
  console.log(req.method)
  const otb = await prisma.oTBSampleHistory.findMany()
  // console.log(otb)
  res.json(otb)
}
// 