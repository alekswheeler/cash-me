# chash-me



#Como executar

Certifique-se de der o docker e docker-compose instalados na sua máquina. Ao baixar o projeto, instale as dependências

    yarn

ou

    npm i

Após isso, "suba" os containers do docker com o seguinte comando

    sudo docker-compose up

Isso fará com que tanto a aplicação quanto o banco de dados fiquem online.
Em outro terminal, faça a configuração das tabelas do banco de dados com o seguinte comando:

    yarn migration:up

Após isso, execute alguma chama à api. O servidor fica em ``http://localhost:8080``

### Cadastro (post): /users

Informe username e senha. Todas as contas começam com 100 reais

      {
        "username": "fulano",
        "senha": "Password123"
      }
  
 ### Login (post): /users/login
 
 Aqui você obtem o token para autenticação na API
 
      {
        "username": "fulano",
        "senha": "Password123"
      }
      
 Você recebe um token que precisa ser passado para qualquer rota que se deseja ter acesso. Passe por baerer token
 
### Transferência

Faça uma transferência para outro usuário (post)/transactions

      {
        "to": "fulano",
         "value": 50
      }

### Veja sua lista de transferências (get) /transactions

Você também pode adicionar filtros por query params

      {
        dateTo: "yyyy/mm/dd"
        dateFrom: "yyyy/mm/dd"
        type: "cash-in" | "cash-out"
      }
