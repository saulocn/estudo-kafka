const pool = require('./connection')

const saveTransaction = transaction => new Promise((resolve, reject) => {
    pool.query('INSERT INTO test_kafka.transaction SET ?',
        {
            id: transaction.id,
            creation_date: new Date(transaction.creation_date).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            value: transaction.value,
            person_id: transaction.person_id
        },
        function (error, results, fields) {
            if (error) {
                reject(error)
                return;
            }
            resolve(results)
        });
})

module.exports = saveTransaction