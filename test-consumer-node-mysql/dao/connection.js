const mysql      = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 2,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'test_kafka',
    database : 'test_kafka',
    port: '33061'
});

module.exports = pool