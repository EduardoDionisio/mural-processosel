const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mural',
    password: 'eduardo',
    port: 5432,
})

client.connect((err) => {
    if (err) {
        console.log("*******************************");
        console.error('* Database connection error *\n\n', err.stack);
        console.log("*******************************");
        client.end();
    } else {
        console.log("***********************************");
        console.log("* Mural started in port: 3000  *\ n* Database: " + client.database + " is connected *")
        console.log("***********************************\n\n");
    }
})

module.exports = {
    query: (text, values, callback) => {
        return client.query(text, values, callback)
    },
    queryAsync: (text, values) => client.query(text, values)
}
