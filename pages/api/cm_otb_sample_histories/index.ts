import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'
import { PrismaClient } from '@prisma/client'



import * as cosmos from '@azure/cosmos'
const prisma = new PrismaClient();

import appConfig from "../../../app/appConfig";
// 

const endpoint = appConfig.endpoint
const key = appConfig.key
const options = {
  endpoint: endpoint,
  key: key,
  userAgentSuffix: 'CosmosDBJavascriptQuickstart'
};

const databaseId = appConfig.database.id
const containerId = appConfig.container.id
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }
const client = new cosmos.CosmosClient(options)
export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handle(req, res) {

  const method = req.method
  if (req.method === "GET")
  console.log(req)
console.log(method)


  const otb = await prisma.oTBSampleHistory.findMany()
  console.log(otb)
  
  
  res.json(otb)

}
// 