import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'
import { PrismaClient } from '@prisma/client'



import * as cosmos from '@azure/cosmos'


import config from '../../../app/config'
// 

const endpoint = config.endpoint
const key = config.key
const options = {
  endpoint: endpoint,
  key: key,
  userAgentSuffix: 'CosmosDBJavascriptQuickstart'
};

const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }
const client = new cosmos.CosmosClient(options)



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