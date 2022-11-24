# chash-me

Esse é um projeto nodejs backend para transferência de valores entre os usuários. É possível fazer login, forncendo usernma e password. Fazer transferências a outros usuários e visualizar o seu próprio saldo. Muitas regras foram atendidas para que o sistema esteja consistente em todas as suas operações, por exemplo, não é possível enviar uma quantia maior do que a que o usuário possui. 
É importante ressaltar que apenas parte dos testes foram implementados, mas os existentes serevem bem para mostrar como que são feitos os testes automatizados.

## Como executar

Certifique-se de der o docker e docker-compose instalados na sua máquina. Ao baixar o projeto, instale as dependências

    yarn

ou

    npm i

Após isso, crie um arquivo `.env` com as suas senhas, um arquivo `.env.local` está disponível para testes.
Depois é só "subir" os containers do docker

    sudo docker-compose up

Isso fará com que tanto a aplicação quanto o banco de dados fiquem online.
Em outro terminal, faça a configuração das tabelas do banco de dados com o seguinte comando

    yarn migration:up

Após isso, execute alguma chama à api. O servidor fica em ``http://localhost:8080``. Você pode usar o insomnia ou o curl pelo terminal.

Caso queira executar alguns testes automatizados [FALR DOS TESTES QUE TEM]
    
    yarn test

## Serviços implementados

### Cadastro [POST]/users

Informe username e senha. Todas as contas começam com 100 reais

      {
        "username": "fulano",
        "password": "Password123"
      }
  
 ### Login [POST]/users/login
 
 Aqui você obtem o token para autenticação na API
 
      {
        "username": "fulano",
        "password": "Password123"
      }
      
 Você recebe um token que precisa ser passado para qualquer rota que se deseja ter acesso. Passe por baerer token
 
### Transferência

Faça uma transferência para outro usuário [POST]/transactions

      {
        "to": "fulano",
         "value": 50
      }

### Veja sua lista de transferências [GET]/transactions

Você também pode adicionar filtros por query params. Abaixo você encontra os formatos aceitos. Em questão de datas, qualquer formato de [data](https://www.postgresql.org/docs/15/datatype-datetime.html#DATATYPE-DATETIME-INPUT) aceito pelo postgres será aceito na aplicaçãoo

      {
        dateTo: "yyyy/mm/dd"
        dateFrom: "yyyy/mm/dd"
        type: "cash-in" | "cash-out"
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

Entretanto, ao trabalhar com os relacionamentos entre as tabelas pude desenvolver um conhecimento mais aprofundando de como o typeorm em específico funcina para esse mapeamento de chaves estrangeiras e também pude perceber como é feito o parse de entidades no seu código para as tabelas de bancos de dados.

Um outro conhecimento adquirido por meio deste projeto foi o de filtros com o typeorm. Tive que pesquisar muito afundo na documentação para conseguir fazer todas as pesquisas de maneira a conseguir obter os resultados esperados. E isso também se relaciona com o banco de dados, pois mesmo utilizando uma ferramenta ORM, é necessário conhecer bastante do banco de dados com o qual se está trabalhando. Toda vez que tinha que pensar sobre os tipos de dados a serem armazenados no postgres, valia a pena olhar a documentação e escolher qual o melhor tipo que é suportado pelo banco e que atende aos requisitos do projeto.

## O que vem a seguir

- injeção de dependências
- documentação com swagger
- implementação dos outros testes
