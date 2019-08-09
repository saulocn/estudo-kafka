package br.com.study.kafka.springkafka.resource;

import br.com.study.kafka.springkafka.model.User;
import br.com.study.kafka.springkafka.producer.UserProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("kafka")
public class UserResource {
    @Autowired
    private KafkaTemplate<Object, Object> template;

    @Autowired
    UserProducer producer;

    @GetMapping("/publish/{nome}")
    public String post(@PathVariable("nome") final String nome) {
        producer.sendUser(User.builder().nome(nome).build());
        return nome;
    }
}
