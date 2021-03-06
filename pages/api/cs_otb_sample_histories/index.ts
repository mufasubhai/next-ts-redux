import { NextApiRequest, NextApiResponse } from "next";
// import { sampleUserData } from '../../../utils/sample-data'

import cassandra from "cassandra-driver";
import { PrismaClient } from "@prisma/client";
import appConfig from "../../../app/appConfig";
import { objectExpression } from "@babel/types";
import { TIMEOUT } from "dns";

const prisma = new PrismaClient();

const escapeVals = (el) => {

if (el instanceof Date) return "'" +  el.toISOString().split('T').join(' ').split('Z').join("") + "'"

 if (typeof el != "string") return el
  return "'" +  el.split("'").join("''") + "'"
}
const checkNum = (el) => {
  if (el === null) return null
return (typeof el === 'number') ? el :  escapeVals(el)
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
  appConfig.cassandraUN,
  appConfig.cassandraPW
);

console.log(appConfig.cassandraLocalDataCenter);

let client = new cassandra.Client({
  contactPoints: [`${appConfig.cassandraContactPoint}:10350`],
  authProvider: authProvider,
  localDataCenter: appConfig.cassandraLocalDataCenter,
  sslOptions: {
    secureProtocol: "TLSv1_2_method",
  },
});
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let keySpace = "otbData";
let table = "otbSampleHistories";
let table2 = "product"
let table3 = "dates"
let table4 = "hierarchies"

export const config = {
  api: {
    responseLimit: false,
  },
}
export default async function handle(
  _req: NextApiRequest, res: NextApiResponse
) {
  await client.connect();
  console.log(_req.method);

  if (_req.method === "POST") {
    console.log(_req.body);
    // const otb = await prisma.oTBSampleHistory.findMany();
    // console.log(otb)
    var query = `CREATE KEYSPACE IF NOT EXISTS ${keySpace} WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter' : '1' }`;
    await client.execute(query);
    console.log("created keyspace");
  

    // query = `CREATE TABLE IF NOT EXISTS ${keySpace}.${table4} (
    //  hrchy_id int PRIMARY KEY,
    //    subclass varchar,
    //   class varchar,
    //   dept varchar
    //   );`;
    query = `CREATE TABLE IF NOT EXISTS ${keySpace}.${table3} (
      date_val timestamp PRIMARY KEY,
      day_eng varchar,
      fscl_week varchar,
      fscl_mnth varchar,
      FSCL_QTR varchar,
      FSCL_YEAR int,
      );`;
      // PRIMARY KEY (fiscalYear, fiscalQuarter, fiscalMonth, fiscalWeek, deptName, className, priceStatus)
      await client.execute(query);
      const dates = await prisma.date.findMany();
      console.log(dates)

      let dateResults = dates.map(otbObject => parsedInsertString(otbObject, table3, keySpace))
      let startSeconds = new Date();
      let seconds;
      let secondsElapsed
     for (let i = 0; i < dateResults.length; i++) {
        try {
      
            await client.execute(dateResults[i]);
            await timeout(10)
            // console.log(dateResults[i])
            secondsElapsed = parseFloat((new Date() - startSeconds) / 1000)
            console.log(`record ${i + 1} of ${dateResults.length} in ${secondsElapsed} seconds`)
       
        } catch(err) {
          console.log(err)
        }
    }
    seconds = parseFloat((new Date() - startSeconds) / 1000)
    console.log(`Query returned in ${seconds}`)
    
    // // console.log("created table");
 

    res.json(dates);


  } else if (_req.method === "GET"){
    const products = await prisma.product.findMany();
    // console.log(otb)
    // console.log(otb)
    res.json(products)

  }
}
//
