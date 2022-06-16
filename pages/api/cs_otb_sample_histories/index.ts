import { NextApiRequest, NextApiResponse } from "next";
// import { sampleUserData } from '../../../utils/sample-data'

import cassandra from "cassandra-driver";
import { PrismaClient } from "@prisma/client";
import config from "../../../app/config";
import { objectExpression } from "@babel/types";
import { TIMEOUT } from "dns";

const prisma = new PrismaClient();


const checkNum = (el) => {
  if (el === null) return null
return (typeof el === 'number') ? el : "'" + el + "'"
}
const parsedInsertString = (otbObject, table, keySpace) => {
  let insertStringColumns = '('
  let insertStringValues = '(' 


 
  Object.entries(otbObject).forEach((pair, idx) => {


    
    insertStringColumns = insertStringColumns + pair[0]
    insertStringValues = insertStringValues + checkNum(pair[1])
    if (idx === (Object.entries(otbObject).length - 1)) {

    
      insertStringColumns = insertStringColumns + ')'
      insertStringValues = insertStringValues + ')'
    } else {
      insertStringColumns = insertStringColumns + ', '
      insertStringValues = insertStringValues + ', '
    }

  })

  return `INSERT INTO ${keySpace}.${table} ` + insertStringColumns + " VALUES " + insertStringValues
}
let authProvider = new cassandra.auth.PlainTextAuthProvider(
  config.cassandraUN,
  config.cassandraPW
);

console.log(config.cassandraLocalDataCenter);

let client = new cassandra.Client({
  contactPoints: [`${config.cassandraContactPoint}:10350`],
  authProvider: authProvider,
  localDataCenter: config.cassandraLocalDataCenter,
  sslOptions: {
    secureProtocol: "TLSv1_2_method",
  },
});
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let keySpace = "otbData";
let table = "otbSampleHistories";
let table2 = ""
let table3 = ""

export default async function handle(
  _req: NextApiRequest, res: NextApiResponse
) {
  await client.connect();
  console.log(_req.method);

  if (_req.method === "POST") {
    console.log(_req.body);
    const otb = await prisma.oTBSampleHistory.findMany();
    // console.log(otb)
    var query = `CREATE KEYSPACE IF NOT EXISTS ${keySpace} WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter' : '1' }`;
    await client.execute(query);
    console.log("created keyspace");
    console.log(otb[0])
    
    query = `CREATE TABLE IF NOT EXISTS ${keySpace}.${table} (AIR float, 
      AUC float,
      AUR float,
      GMPerc float,
      className varchar,
      deptName varchar,
      discountPerc float,
      fiscalMonth varchar,
      fiscalQuarter varchar,
      fiscalWeek varchar,
      fiscalYear int,
      priceStatus varchar,
      salesCost float,
      salesRetail float,
      salesUnits float,
      tranCount float,
      PRIMARY KEY (fiscalYear, fiscalQuarter, fiscalMonth, fiscalWeek, deptName, className, priceStatus)
      );`;
      await client.execute(query);
      
    //   let otbResults = otb.map(otbObject => parsedInsertString(otbObject, table, keySpace))
    //   let startSeconds = new Date();
    //   let seconds;
    //   for (const element of otbResults) {
    //     try {
      
    //         await client.execute(element);
    //         await timeout(10)
       
    //     } catch(err) {
    //       console.log(err)
    //     }
    // }
    // seconds = parseFloat((new Date() - startSeconds) / 1000)
    // console.log(`Query returned in ${seconds}`)
    
    // console.log("created table");
    // const otb = await prisma.oTBSampleHistory.findMany()

    // res.json(otbResults[0]);


  } else if (_req.method === "GET"){
    const products = await prisma.product.findMany();
    // console.log(otb)
    // console.log(otb)
    res.json(products)

  }
}
//
