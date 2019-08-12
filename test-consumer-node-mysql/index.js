const saveTransaction = require('./dao/transactionDao')
const kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient(),
consumer = new Consumer( client, [{ topic: 'kafka_example', partition: 0 }], {autoCommit: false, fromOffset: true })
const inicio = new Date()
const transactions = []

const toTransaction = (transaction) => ([
        transaction.id,
        new Date(transaction.creation_date).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        transaction.value,
        transaction.person_id
])

consumer.on('message', async message => {
    const transaction = JSON.parse(message.value)
    console.log('received', message.value);
    transactions.push(toTransaction(transaction))
    if(message.offset === (message.highWaterOffset - 1)) {
        const time = new Date()-inicio
        try{
            await saveTransaction(transactions)
        } catch (e) {
            console.error(e)
        }
        console.info('Execution time: %dms', time)
        process.exit(0);
    }
});

consumer.on('error', function(err) {
    console.log('error', err);
});

process.on('SIGINT', function() {
    consumer.close(true, function() {
        process.exit();
    });
});
