const kafka = require('kafka-node')
Consumer = kafka.Consumer,
client = new kafka.KafkaClient()
const consumeTransaction = () => new Promise((resolve, reject) => {
    const consumer = new Consumer(client, [{ topic: 'kafka_example', partition: 0 }], { autoCommit: false, fromOffset: true })
    consumer.on('message', message => {
        const transaction = JSON.parse(message.value)
        resolve(transaction)
        consumer.close()
        return;
    });
    consumer.on('error', function (err) {
        reject(err)
        return;
    });
})
module.exports = consumeTransaction