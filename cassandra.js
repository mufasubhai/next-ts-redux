const cassandra = require("cassandra-driver");


const callCassandra = async () => {
    let authProvider = new cassandra.auth.PlainTextAuthProvider(
        process.env.CASS_USERNAME,
        process.env.CASS_PW
    );

    let client = new cassandra.Client({
        contactPoints: [`${process.env.CASS_CONTACT_POINT}:10350`],
        authProvider: authProvider,
        localDataCenter: process.env.CASS_LOCAL_DATA_CENTER,
        sslOptions: {
            secureProtocol: "TLSv1_2_method"
        },
    });

    await client.connect();

    var query =
        `CREATE KEYSPACE IF NOT EXISTS ${process.env.CASS_KEYSPACE} WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter' : '1' }`;
    await client.execute(query);
    console.log("created keyspace");

    query =
        `CREATE TABLE IF NOT EXISTS ${process.env.CASS_KEYSPACE}.user (user_id int PRIMARY KEY, user_name text, user_bcity text)`;
    await client.execute(query);
    console.log("created table");

    console.log("insert");
    const arr = [
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (1, 'AdrianaS', 'Seattle')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (2, 'JiriK', 'Toronto')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (3, 'IvanH', 'Mumbai')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (4, 'IvanH', 'Seattle')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (5, 'IvanaV', 'Belgaum')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (6, 'LiliyaB', 'Seattle')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (7, 'JindrichH', 'Buenos Aires')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (8, 'AdrianaS', 'Seattle')`,
        `INSERT INTO  ${process.env.CASS_KEYSPACE}.user (user_id, user_name , user_bcity) VALUES (9, 'JozefM', 'Seattle')`,
    ];
    for (const element of arr) {
        await client.execute(element);
    }

    query = `SELECT * FROM ${process.env.CASS_KEYSPACE}.user`;
    const resultSelect = await client.execute(query);

    for (const row of resultSelect.rows) {
        console.log(
            "Obtained row: %d | %s | %s ",
            row.user_id,
            row.user_name,
            row.user_bcity
        );
    }

    console.log("Getting by id");
    query = `SELECT * FROM ${process.env.CASS_KEYSPACE}.user where user_id=1`;
    const resultSelectWhere = await client.execute(query);

    for (const row of resultSelectWhere.rows) {
        console.log(
            "Obtained row: %d | %s | %s ",
            row.user_id,
            row.user_name,
            row.user_bcity
        );
    }

    client.shutdown();
};

callCassandra()
    .then(() => {
        console.log("done");
    })
    .catch((err) => {
        console.log(err);
    });