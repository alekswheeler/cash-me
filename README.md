# chash-me

Esse é um projeto nodejs backend para transferência de valores entre os usuários. É possível fazer login, forncendo usernma e password. Fazer transferências a outros usuários e visualizar o seu próprio saldo. Muitas regras foram atendidas para que o sistema esteja consistente em todas as suas operações, por exemplo, não é possível enviar uma quantia maior do que a que o usuário possui. 
É importante ressaltar que apenas parte dos testes foram implementados, mas os existentes serevem bem para mostrar como que são feitos os testes automatizados. 

Ademais, devido às características de orientação a objetos, um objeto do tipo transação tem acesso às duas contas à qual a mesma referência, e por esse motivo ao usar o ORM a resposta da query vem com esses dados. Esse ponto pode ser tratado no back-end para que um usuário ao listar as tranferências não veja o balance dos usuários para os quais fez alguma operação financeira. Mas, vale ressaltar que um usuário não consegue ter acesso à transações das quais o mesmo não fez parte.

## Como executar

Certifique-se de der o docker e docker-compose instalados na sua máquina. Ao baixar o projeto, instale as dependências

    yarn

ou

    npm i

Um arquivo `.env.local` está disponível para exemplo. Faça uma cópia para o arquivo de variáveis de ambiente com o seguinte comando

    cp .env.local .env

Depois é só "subir" os containers do docker

    sudo docker-compose up

Isso fará com que tanto a aplicação quanto o banco de dados fiquem online.
Em outro terminal, faça a configuração das tabelas do banco de dados com o seguinte comando

    yarn migration:up

Após isso, execute alguma chama à api. O servidor fica em ``http://localhost:8080``. Você pode usar o insomnia ou o curl pelo terminal.

Caso queira executar alguns testes automatizados
    
    yarn test
   
Os testes implementados para a demonstração foram: Criação de conta e Efetuação do Login.

- Criação de conta:
    - Deve ser possível criar uma nova conta;
    - Não deve ser possível criar duas contas com mesmo username;
- Efetuação do login:
    - Deve ser possível efeturar login com username e password;
    - Não deve ser possível se autenticar com usernmae ou password incorretos;
    - Não deve ser possível autenticar um usuário inexistente;

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


## Aprendizados

Já conheço a maior parte das ferramentas utilizadas, entre elas:

- [typeorm](https://typeorm.io/) (Object Relational Mapper)
- [express](https://www.npmjs.com/package/express) (nodejs web framework)
- [docker](https://www.docker.com/) (containers)
- [joi](https://joi.dev/api/) (schema validator)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (authentication)
- [jest](https://jestjs.io/pt-BR/docs/getting-started) (test)
- [postgres](https://www.postgresql.org/) (database)
- eslint (pattern checker)

Entretanto, ao trabalhar com os relacionamentos entre as tabelas pude desenvolver um conhecimento mais aprofundando de como o typeorm em específico funcina para esse mapeamento de chaves estrangeiras e também pude perceber como é feito o parse de entidades no seu código para as tabelas de bancos de dados e vice-versa.

Um outro conhecimento adquirido por meio deste projeto foi o de filtros com o typeorm. Tive que pesquisar muito afundo na documentação para conseguir fazer todas as pesquisas de maneira a conseguir obter os resultados esperados. E isso também se relaciona com o banco de dados, pois mesmo utilizando uma ferramenta ORM, é necessário conhecer bastante do banco de dados com o qual se está trabalhando. Toda vez que tinha que pensar sobre os tipos de dados a serem armazenados no postgres, valia a pena olhar a documentação e escolher qual o melhor tipo que é suportado pelo banco e que atende aos requisitos do projeto.

## O que vem a seguir

- injeção de dependências
- documentação com swagger
- implementação dos outros testes

---

# Atualização

A Injeção de dependências foi adiconada ao código.
Comentário adicionais foram inseridos assim como um arquivo do insomnia com um fluxo de testes pré-configurado.
Na branch `reorganizacao` (pull request aberto) encontra-se umma nova maneira de organizar os arquivos está disponível (mais legível?). Mas recomendo que para rodar o projeto use o código da main.

## Curl commands

**Create user**

    curl -XPOST -H "Content-type: application/json" -d '{ "username": "fulano", "password": "Password123" }' 'http://localhost:8080/users'

**Login user**

    curl -XPOST -H "Content-type: application/json" -d '{ "username": "fulano", "password": "Password123" }' 'http://localhost:8080/users/login'

**Make transfer**

    curl -XPOST -H 'Authorization: Bearer <token>' -H "Content-type: application/json" -d  '{ "to": "fulano", "value": 15 }' 'http://localhost:8080/transactions'

**Get Transfers**

    curl -XGET -H 'Authorization: Bearer <token>' -H "Content-type: application/json" 'http://localhost:8080/transactions'