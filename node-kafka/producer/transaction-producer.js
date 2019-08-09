const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
    producer = new Producer(client);

const sendTransaction = transaction => new Promise((resolve, reject) => {
    const payload = {
        topic: 'kafka_example',
        messages: JSON.stringify(transaction),
        timestamp: Date.now() 
     }
    producer.send([payload], function (err, data) {
        if(err){
            reject(err)
            return
        }
        resolve(data)
    });
})

module.exports = sendTransaction