package br.com.study.kafka.springkafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class UserListener {
    @KafkaListener(topics = "kafka_example")
    public void processMessage(String content) {
        System.out.println("Mensagem recebida... " + content);
    }
}
