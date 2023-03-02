# chash-me

Esse é um projeto nodejs backend para transferência de valores entre os usuários. É possível fazer login, forncendo usernma e password. Fazer transferências a outros usuários e visualizar o seu próprio saldo. Muitas regras foram atendidas para que o sistema esteja consistente em todas as suas operações, por exemplo, não é possível enviar uma quantia maior do que a que o usuário possui.
É importante ressaltar que apenas parte dos testes foram implementados, mas os existentes serevem bem para mostrar como que são feitos os testes automatizados.

## Como executar

Ao baixar o projeto, instale as dependências

    yarn

ou

    npm i

Após isso, execute alguma chama à api. O servidor fica em `http://localhost:8080`. Você pode usar o insomnia ou o curl pelo terminal.

Caso queira executar alguns testes automatizados

    yarn test

Os testes implementados para a demonstração foram: Criação de conta e Efetuação do Login.

- Criação de conta:
  - Deve ser possível criar uma nova conta;
  - Não deve ser possível criar duas contas com mesmo username;
  - A conta deve iniciar com um saldo de 100 reais;
- Efetuação do login:
  - Deve ser possível efeturar login com username e password;
  - Não deve ser possível se autenticar com usernmae ou password incorretos;
  - Não deve ser possível autenticar um usuário inexistente;

Demais testes a serem feitos:

- Transferência de valores:
  - Não deve ser possível transferir um saldo negativo;
  - Não deve ser possível transferir para um usuário inexistente;
  - Não deve ser possível transferir dinheiro para a própria conta;
  - Não deve ser possível transferir um valor acima do saldo da conta;
  - Deve ser possível transferir valores à um outro usuário cadastrado no sistema;
  - O usuário deve ser autenticado para realizar uma transferência
- Visualização das transferências:
  - Deve ser possível visualizar todas as transferências que o próprio usuário realizou;
  - Não deve ser possível vizualizar as transferências de outro usuário;
  - O usuário deve estar autenticado para visualizar as transferências feitas;

## Serviços implementados

### Cadastro [POST]/users

Informe username e senha. Todas as contas começam com 100 reais

      {
        "username": "fulano",
        "password": "Password123"
      }

### Login [POST]/users/login

Aqui você obtem o token para autenticação na API. Para qualquer serviço que o usuário deseje acessar, é necessaŕio que passe o token de autenticação via baerer token.

      {
        "username": "fulano",
        "password": "Password123"
      }

### Transferência

Faça uma transferência para outro usuário [POST]/transactions

      {
        "to": "fulano",
        "value": 50
      }

### Veja sua lista de transferências [GET]/transactions

Você também pode adicionar filtros por query params. Abaixo você encontra os formatos aceitos. Em questão de datas, qualquer formato de [data](https://www.postgresql.org/docs/15/datatype-datetime.html#DATATYPE-DATETIME-INPUT) aceito pelo postgres será aceito na aplicação.

      {
        "dateTo": "yyyy/mm/dd"
        "dateFrom": "yyyy/mm/dd"
        "type": "cash-in" | "cash-out"
      }

### Veja o seu saldo atual [GET]/users/balance

Essa requisição retorna o saldo atual da pessoa logada. Exemplo de resposta:

        {
            "balance": "300"
        }
