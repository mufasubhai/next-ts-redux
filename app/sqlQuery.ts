import config from './config'
import conn from '../lib/db'

import { Pool }  from 'pg'
// async function get_connection(context) {

//     // // console.log("GETTING CONNECTION")
//     try {
//       // // context.log("SUCCESSFUL TES TEST TESTCONNECTION")
//       // // context.log( `Server=${config.database.host},1433;Database=${config.database.database_name};User Id=${config.database.user};Password=${config.database.password};Encrypt=true`)
//       await sql.connect(
//         `Server=${config.pgHost},${config.pgPort};Database=${config.pgDB};User Id=${config.pgUser};Password=${config.pgPW};Encrypt=true`
//       );
  
//     }catch(e){
//       context.log.error(e);
//     }

//   }

  async function clientDataPull() {
        
      const OTBHistories = await conn.query('SELECT * from otb_sample_histories')
    await conn.end()


    console.log(OTBHistories)
    return OTBHistories

  }



export default  {
      clientDataPull
  }
