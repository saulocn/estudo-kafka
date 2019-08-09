package br.com.study.kafka.springkafka.producer;

import br.com.study.kafka.springkafka.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Component
public class UserProducer {
    private static final String TOPIC = "kafka_example";
    private final KafkaTemplate kafkaTemplate;

    @Autowired
    public UserProducer(KafkaTemplate kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendUser(User user) {
        ListenableFuture<SendResult<Object, Object>> future = kafkaTemplate.send(TOPIC, user.toString());
        future.addCallback(new ListenableFutureCallback<SendResult<Object, Object>>() {
            @Override
            public void onSuccess(SendResult<Object, Object> result) {
                System.out.println("Sent message=[" + user +
                        "] with offset=[" + result.getRecordMetadata().offset() + "]");
            }

            @Override
            public void onFailure(Throwable ex) {
                System.out.println("Unable to send message=["
                        + user + "] due to : " + ex.getMessage());
            }
        });
    }
}
