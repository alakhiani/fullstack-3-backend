const { MongoClient } = require('mongodb');

exports.connectToDB = async (DB_URI, DB_NAME, cb) => {
    try {
        const client = new MongoClient(DB_URI);
        console.log('About to connect to MongoDB');
        await client.connect();
        console.log(`Switching to database '${DB_NAME}'`);
        client.db(DB_NAME);
        cb();
    } catch (err) {
        console.error('Error: ', err);
    }
}