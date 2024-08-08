<a name="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">Gym Check-in API</h3>
  
  <p align="center">
    API para gerenciamento de check-ins em academias!
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#construído-com">Construído com</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#prerequisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#estrutura-do-projeto">Estrutura do Projeto</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#testes">Testes</a></li>
    <li><a href="#contribuição">Contribuição</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre o Projeto
Gym Check-in API é uma aplicação para gerenciar check-ins de usuários em academias, seguindo os princípios do SOLID para garantir um código robusto e fácil de manter. Este repositório é destinado a fins de estudos.

### Construído com

Esta seção lista as principais tecnologias e frameworks utilizados no projeto.

* [@prisma/client](https://www.prisma.io/)
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* [dayjs](https://day.js.org/)
* [dotenv](https://github.com/motdotla/dotenv)
* [fastify](https://www.fastify.io/)
* [zod](https://github.com/colinhacks/zod)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Começando

Estas são as instruções de configuração e execução do projeto localmente.

### Pré-requisitos

Lista de tecnologias necessárias para rodar o projeto.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/yrlanrteixeira/api-solid-gym.git
   ```

2. Navegue até o diretório do projeto:
   ```sh
   cd api-solid-gym
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente:
   ```env
   DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
   ```
5. Crie e inicie o container Docker do PostgreSQL:
   ```sh
   docker run --name postgres-container -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=apisolid -p 5432:5432 -d postgres
   ```
6. Execute as migrações do banco de dados:
   ```sh
   npx prisma migrate dev
   ```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Uso

1. Inicie o servidor:
   ```sh
   npm start
   ```

2. A API estará disponível em `http://localhost:3333`.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Estrutura do Projeto

- **src/**: Diretório contendo o código-fonte da aplicação.
  - **controllers/**: Contém os controladores que lidam com as requisições HTTP.
  - **middlewares/**: Contém os middlewares utilizados na aplicação.
  - **routes/**: Contém as definições de rotas da aplicação.
  - **schemas/**: Contém os esquemas de validação usando Zod.
  - **services/**: Contém a lógica de negócios da aplicação.
  - **utils/**: Contém utilitários e helpers da aplicação.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Endpoints

### Autenticação

- **POST /login**: Autentica um usuário.
  - Request Body:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123"
    }
    ```

- **POST /register**: Registra um novo usuário.
  - Request Body:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123",
      "name": "Nome do Usuário"
    }
    ```

### Check-ins

- **POST /checkin**: Realiza o check-in de um usuário.
  - Request Body:
    ```json
    {
      "userId": "id_do_usuario",
      "gymId": "id_da_academia"
    }
    ```

- **GET /checkins**: Lista todos os check-ins.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Testes

Para rodar os testes, use o comando:

```sh
npm test
```
E para testes e2e
```sh
npm test:e2e
```


<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contribuição

Se você tem uma sugestão que tornaria isso melhor, por favor faça um fork do repositório e crie um pull request. Você também pode simplesmente abrir uma issue com a tag "enhancement".

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`).
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4. Faça o push para a branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contato

Yrlan Teixeira
Link do Projeto: [https://github.com/yrlanrteixeira/api-solid-gym](https://github.com/yrlanrteixeira/api-solid-gym)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/yrlanrteixeira/api-solid-gym.svg?style=for-the-badge
[contributors-url]: https://github.com/yrlanrteixeira/api-solid-gym/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yrlanrteixeira/api-solid-gym.svg?style=for-the-badge
[forks-url]: https://github.com/yrlanrteixeira/api-solid-gym/network/members
[stars-shield]: https://img.shields.io/github/stars/yrlanrteixeira/api-solid-gym.svg?style=for-the-badge
[stars-url]: https://github.com/yrlanrteixeira/api-solid-gym/stargazers
[issues-shield]: https://img.shields.io/github/issues/yrlanrteixeira/api-solid-gym.svg?style=for-the-badge
[issues-url]: https://github.com/yrlanrteixeira/api-solid-gym/issues
[license-shield]: https://img.shields.io/github/license/yrlanrteixeira/api-solid-gym.svg?style=for-the-badge
[license-url]: https://github.com/yrlanrteixeira/api-solid-gym/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
