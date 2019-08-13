const consumeTransaction = () => new Promise((resolve, reject) => {
    const kafka = require('kafka-node')
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient()
    const consumer = new Consumer(client, [{ topic: 'kafka_example', partition: 0 }], { autoCommit: false, fromOffset: true })
    const consumeMessage = message => {
        const transaction = JSON.parse(message.value)
        consumer.removeListener('message', consumeMessage)
        consumer.removeListener('error', handleError)
        consumer.close()
        resolve(transaction)
        return
    }
    const handleError = err => {
        consumer.removeListener('message', consumeMessage)
        consumer.removeListener('error', handleError)
        consumer.close()
        reject(err)
        return
    }
    consumer.on('message', consumeMessage)
    consumer.on('error', handleError)
})
module.exports = consumeTransaction