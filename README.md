## C.R.U.D de usuário

### Estrutura:
* Postgres
* MVC
* Typescript
* ORM: TypeORM


### Rotas
* GET - /users -> lista os usuários ( por nome e sobrenome )
* GET -/users/id -> id é tipo UUID, você pode pesquisar também enviando nome OU sobrenome pelo corpo da requisição.
* POST - /users -> Cria usuário , informações: <code>
{
  "name":"",
  "lastname": "",
  "nickname": "",
  "address": "",
  "bio":"".
}</code>
* PUT - users/id -> Altera usuário, nome , sobrenome e nickname.
* DELETE - users/id -> apaga usuário pelo número de seu ID

## Para iniciar
* <code>yarn dev</code>
* <code>npm run dev</code>
