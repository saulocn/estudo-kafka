
# Repsitório para estudo de Kafka

  

* Início com Spring Boot (Consumer / Producer)

  

* Início com NodeJS (Producer)

  

* Início com NodeJS (Consumer MongoDB)

  

* Início com NodeJS (Consumer MariaDB)

  

# Inicialização do Kafka e das dependências

  

Para inicializar o projeto, deve-se inicializar primeiramente o Kafka, Zookeeper e as bases de dados.

Todas essas dependências encontram-se no arquivo docker-compose.

  

## Inicializando os serviços:

```

docker-compose up -d

```

- Após a inicialização, para os serviços Node, deve-se instalar as dependências através do comando

```

npm i

```

  

- E inicializar a aplicação desejada através do comando:

```

npm start

```