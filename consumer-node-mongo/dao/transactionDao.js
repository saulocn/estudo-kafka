const client = require('./connection')
const COLLECTION = 'transactions'
const DBNAME = 'test_kafka'

const saveTransaction = transaction => new Promise(async (resolve, reject) => {
    try {
        await client.connect()
        const db = client.db(DBNAME);
        const collection = db.collection(COLLECTION);
        collection.insertMany([transaction], function (err, result) {
            if (err) {
                reject(err)
                return
            }
            resolve(result);
        })
    } catch (e) {
        console.error(e)
        reject(e)
    }
})

module.exports = saveTransaction