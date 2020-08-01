# Plataforma genérica de vídeos

Esse projeto é uma plataforma de compartilhamento de vídeos, semelhante ao youtube, vimeo e outras.

## Objetivo do projeto

O projeto foi desenvolvido para matar uma curiosidade que tinha sobre plataformas de envio de videos e também melhorar minhas habilidades como programador

## Como executar esse projeto em sua máquina

- Instale o [Nodejs](https://nodejs.org/en/) na versão LTS
- Instale o [Docker](https://docs.docker.com/get-docker/)
- Crie no docker uma instância POSTGRESQL

<pre>docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres</pre>

- Crie no docker uma instância mongo

<pre> docker run --name some-mongo -p 27017:27017 -d mongo</pre>

- Crie no docker uma instância redis

<pre> docker run --name some-redis -p 6379:6379 -d redis:alpine</pre>

- Crie uma TABELA ,manualmente, na intância POSTGRESQL criada no passo anterior

- Configure o arquivo ormconfig.json.example com as credênciais criadas anteriormente

- Instale todas as dependências

<pre>yarn install</pre>

- Execute as migrations

<pre>yarn typeorm migration:run</pre>

- Execute o servidor

<pre>yarn dev:server</pre>

- Execute o servidor de envios de email

<pre>yarn dev:queue<pre>

## Como testar a aplicação

Instale o [Insomnia](https://insomnia.rest/) em seu computador

Entre na pasta insomnia e importe o arquivo "plataforma-de-video.json"
