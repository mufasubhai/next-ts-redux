import connfig from '../app/appConfig'


import { Pool }  from 'pg'
// async function get_connection(context) {

//     // // console.log("GETTING CONNECTION")
//     try {
//       // // context.log("SUCCESSFUL TES TEST TESTCONNECTION")
//       // // context.log( `Server=${appConfig.database.host},1433;Database=${appConfig.database.database_name};User Id=${appConfig.database.user};Password=${appConfig.database.password};Encrypt=true`)
//       await sql.connect(
//         `Server=${appConfig.pgHost},${appConfig.pgPort};Database=${appConfig.pgDB};User Id=${appConfig.pgUser};Password=${appConfig.pgPW};Encrypt=true`
//       );
  
//     }catch(e){
//       context.log.error(e);
//     }

//   }


let conn;

if (!conn) {
  conn = new Pool({
    user: appConfig.pgUser,
    host: appConfig.pgHost,
    database: appConfig.pgDB,
    password: appConfig.pgPW,
    port: appConfig.pgPort,
  });
}

export default conn;