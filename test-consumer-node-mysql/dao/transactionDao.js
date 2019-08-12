const pool = require('./connection')

const saveTransactions = transactions => new Promise((resolve, reject) => {
    pool.query({
        sql: 'INSERT into test_kafka.transaction (id, creation_date, value, person_id) VALUES ?',
        values: [transactions]
        },
        function (error, results, fields) {
            if (error) {
                reject(error)
                return;
            }
            resolve(results)
        })
})

module.exports = saveTransactions