const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:admin@localhost:27017/';
const client = new MongoClient(url, { useNewUrlParser: true });
module.exports = client