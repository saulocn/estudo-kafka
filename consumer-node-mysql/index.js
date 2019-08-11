const saveTransaction = require('./dao/transactionDao')
const kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient(),
consumer = new Consumer( client, [{ topic: 'kafka_example', partition: 0 }], {autoCommit: false})

consumer.on('message', function (message) {
    const transaction = JSON.parse(message.value)
    console.log('received', message.value);
    saveTransaction(transaction)
    .then(t => {
        console.log('saved!', t)
    })
    .catch(err => {
        console.log(err)
    })
});

consumer.on('error', function(err) {
    console.log('error', err);
});

process.on('SIGINT', function() {
    consumer.close(true, function() {
        process.exit();
    });
});
