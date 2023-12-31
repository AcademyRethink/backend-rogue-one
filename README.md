<h1 style="text-align: center;">💊 Backend - Dashboard Farmácia 💊</h1>

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como iniciar o projeto?](#como-iniciar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Links Úteis](#links-úteis)
- [Autores](#autores)

## Sobre o projeto

Nosso projeto consiste no desenvolvimento de um backend em Node.js para um dashboard no setor farmacêutico. O objetivo principal do sistema é oferecer uma interface intuitiva e eficiente para auxiliar no gerenciamento das atividades diárias de uma farmácia.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:<br>
<img src="https://img.shields.io/static/v1?label=Tipagem&message=TypeScript&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Runtime&message=Node.js&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Framework&message=Express&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=QueryBuilder&message=Knex&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Test&message=Jest&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Auth&message=JWT&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Encrypt&message=Bcrypt&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Library&message=Nodemailer&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=DB&message=PostgreeSQL&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=ORM&message=Supabase&color=007E84&style=for-the-badge"/>

<details>
<summary>Mais informações das tecnologias</summary>

- [TypeScript](https://www.typescriptlang.org/): uma linguagem de programação que adiciona recursos de tipagem estática ao JavaScript.
- [Node.js](https://nodejs.org/): um ambiente de execução JavaScript do lado do servidor.
- [Express.js](https://expressjs.com/): um framework web para Node.js, utilizado para a criação de rotas e manipulação de requisições HTTP.
- [Knex.js](http://knexjs.org/): um construtor de consultas SQL para Node.js que suporta vários bancos de dados relacionais.
- [Jest](https://jestjs.io/): uma estrutura de teste de JavaScript para testar aplicações e bibliotecas.
- [JSON Web Tokens (JWT)](https://jwt.io/): um padrão para autenticação e autorização baseado em tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt): uma biblioteca para o Node.js que permite a criptografia de senhas.
- [Nodemailer](https://nodemailer.com/): uma biblioteca para Node.js que permite o envio de emails.
- [PostgreSQL](https://www.postgresql.org/): um sistema gerenciador de banco de dados relacional.
- [Supabase](https://supabase.io/): uma plataforma que fornece infraestrutura e serviços para desenvolvimento de aplicativos com PostgreSQL.

</details>
<br>

## Funcionalidades

O backend para o dashboard de farmácia oferece as seguintes funcionalidades:

1. Autenticação e Autorização: O sistema suporta o registro de usuários e a autenticação por meio de tokens JWT.

2. Produtos mais vendidos do mercado: O sistema permite acompanhar uma lista dos produtos que foram mai vendidos pelo mercado.

3. Comparação vendas mercado x venda loja: O sistema permite comparar as vendas realizadas pelos concorrentes com as vendas da farmácia.

4. Acompanhamento do estoque: Além das vendas é possível ver a flutuação de estoque em relação a essas vendas, nos períodos em questão.

5. Notificações: Quando um produto atinge uma quantidade miníma em estoque é emitido uma notificação para alertar o gestor da necessidade de compra do mesmo.

## Como iniciar o projeto?

Para iniciar o projeto, é necessário ter o Git e o Node.js instalados em sua máquina, além de seguir o passo a passo descrito abaixo.

### Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)

### Instalação

1. Clone o projeto do repositório:
   ```
   git clone https://github.com/AcademyRethink/backend-rogue-one.git
   ```
2. Acesse a pasta do projeto::
   ```
   cd backend-rogue-one
   ```
3. Instale as dependências do projeto:
   ```
   npm install
   ```
4. Configure o arquivo .env com as credenciais do seu banco de dados

5. Execute as migrações do banco de dados usando o Knex:
   ```
   npx knex migrate:latest
   ```
6. Inicie o projeto:
   ```
   npm start
   ```

## Links Úteis

- [Collection Postman](https://drive.google.com/file/d/1Upp9s6LvYU7bRi5d-zle6O4RJe4fEbE7/view?usp=sharing)

## Autores

<table>
  <tr>
    <td align="center"><img style="border-radius: 50%;" src="./avatar/Adriani.png" width="100px;" alt=""/><br /><sub><b>Adriani Mendes</b></sub><br><sub>Designer</sub></a><br /></td>
    <td align="center"><img style="border-radius: 50%;" src="./avatar/Giovania.png" width="100px;" alt=""/><br /><sub><b>Giovania de Paula</b></sub><br><sub>Product Owner</sub></a><br /></td>
    <td align="center"><img style="border-radius: 50%;" src="./avatar/Luan.png" width="100px;" alt=""/><br /><sub><b>Luan Barreiros</b></sub><br><sub>Developer</sub></a><br /></td>
    
  </tr>
  <tr>
    <td align="center"><img style="border-radius: 50%;" src="./avatar/Marcos.png" width="100px;" alt=""/><br /><sub><b>Marcos Paulo</b></sub><br><sub>Developer</sub></a><br /></td>
    <td align="center"><img style="border-radius: 50%;" src="./avatar/Matheus.png" width="100px;" alt=""/><br /><sub><b>Matheus Dias</b></sub><br><sub>Developer</sub></a><br /></td>
    <td align="center"><img style="border-radius: 50%;" src="./avatar/Delmo.png" width="100px;" alt=""/><br /><sub><b>Vinícius Delmo</b></sub><br><sub>Developer</sub></a><br /></td>
    
  </tr>
</table>

<p align="right"><a href="#">Subir ↑</a></p>
