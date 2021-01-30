# Desafio - Star Wars :D

## [Desafio](DESAFIO.md)


### INSTALAÇÃO

```shell
$ git clone git@github.com:gladson/b2wdigital_desafio.git

$ cd b2wdigital_desafio

$ npm install

added 434 packages from 270 contributors and audited 434 packages in 8.865s

54 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

$ cp .env_example .env

$ npm run dev

> b2wdigital_desafio@1.0.0 dev /media/gladson/immensa/b2wdigital_desafio
> nodemon app.js

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Servidor rodando => http://localhost:9000
MongoDB conectado...

$ npm run test

> b2wdigital_desafio@1.0.0 test /media/gladson/immensa/b2wdigital_desafio
> mocha --exit ./src/test/**/*test.js --require ./src/test/util/test_helper.js

  Star Wars - Planets
    POST /planets
      ✓ POST: Criar um novo planet - com qualquer nome (1359ms)
    GET /planets
      ✓ GET: Listar os planetas (1394ms)
    GET /planets?params=&params=
      ✓ GET: Listar os planetas com filtros(parâmetros)
    GET /planets/:id
      ✓ GET: Buscar o planeta através do ID
    GET(ERROR) /planets/:id
      ✓ GET(ERROR): Buscar o planeta através do ID errado
    PATCH /planets/:id
      ✓ PATCH: Atualizar um campo específico do planeta
    PUT /planets/:id
      ✓ PUT: Atualizar um ou mais campos do planeta
    DELETE /planets/:id
      ✓ DELETE: Deletar o planeta do banco de dados


  8 passing (3s)

```
> Obs.: Existem dois modos de rodar o projeto.

1. npm run start
2. npm run dev

> Obs.: 
> Caso queira rodar a aplicação em uma porta ou host especifico e necessario configuração no arquivo .env

> Obs.: Outro detalhe importante a configuração url de conexão com o MongoDB também no arquivo .env, nesse projeto ja tem uma url em perfeito funcionamento pode usar a vontade.

> Obs.: Comando para rodar os testes.
1. npm run start
