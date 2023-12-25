# Simple Api

_API created using best practices, namely TDD and SOLID._

- TDD (Test-Driven Development)
- DDD (Domain Driven Design)
- SOLID

_Using inversion and dependency injection strategies, separating layers of business rules, application, and infrastructure, making it easy to swap libraries and frameworks._

### About

Simples API, por exemplo, separando as regras de negócio em camadas de domínio, com a aplicação contendo os serviços e a infraestrutura contendo componentes externos.

#### External services:

**Clock**: To obtain the most accurate time possible, I created an interface for implementation. Implement it with some external service to fetch the correct date and time.

**Database**: In this example, I used an in-memory database. If you want to use a real database, simply make the change in the implementation in a straightforward and easy manner, and everything will work.

[Documentation]('https://github.com/lucas-marquisio/api-best-pratice/blob/main/documentation.md')
