# Plataforma genérica de compartilhamento de vídeos
A sua plataforma de compartilhamento de vídeos, assista onde e como quiser.

## Plataforma de vídeos backend
Esse repositório abrange o back-end da aplicação.

## Como executar esse projeto em sua máquina

- Instale o [Nodejs](https://nodejs.org/en/) na versão LTS
- Instale o [Docker](https://docs.docker.com/get-docker/)
- Crie no docker uma instância POSTGRESQL

<pre>docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres</pre>

- Crie no docker uma instância MONGO

<pre> docker run --name some-mongo -p 27017:27017 -d mongo</pre>

- Crie no docker uma instância REDIS

<pre> docker run --name some-redis -p 6379:6379 -d redis:alpine</pre>

- Configure o arquivo ormconfig.json.example com os dados que foram gerados anteriormente

* Crie uma DATABASE ,manualmente, na intância POSTGRESQL criada anteriormente, com o mesmo nome dado a database no arquivo ormconfig.json

* Crie uma DATABASE ,manualmente, na intância MONGO criada anteriormente, com o mesmo nome dado a database no arquivo ormconfig.json

- Instale todas as dependências

<pre>yarn install</pre>

- Execute as migrations

<pre>yarn typeorm migration:run</pre>

- Execute o servidor

<pre>yarn dev:server</pre>

- Execute o servidor de envios de email

<pre>yarn dev:queue</pre>

## Como testar a aplicação

Instale o [Insomnia](https://insomnia.rest/) em seu computador

Entre na pasta insomnia e importe o arquivo "plataforma-de-video.json"
