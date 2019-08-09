const kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient(),
consumer = new Consumer( client, [{ topic: 'kafka_example', partition: 0 }], {autoCommit: false})

consumer.on('message', function (message) {
    const transaction = message.value
    console.log(message.value);
    
});

consumer.on('error', function(err) {
    console.log('error', err);
});

process.on('SIGINT', function() {
    consumer.close(true, function() {
        process.exit();
    });
});
