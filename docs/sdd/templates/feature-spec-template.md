# SPEC-XXX: [Nome da Funcionalidade]

> **Status:** `[DRAFT | REVIEW | APPROVED | IN_PROGRESS | DONE | DEPRECATED]`  
> **Tipo:** Funcionalidade (`Feature`)  
> **Domínio:** `[ex: Agendamentos / Clientes / Funcionários / Autenticação]`  
> **Autor(es):** `[Nome / IA]`  
> **Data de Criação:** `[AAAA-MM-DD]`  
> **Última Atualização:** `[AAAA-MM-DD]`  

---

## 1. Visão Geral e Contexto de Negócio

### 1.1 Descrição Curta
Descreva sucintamente o objetivo da funcionalidade e o valor gerado para o usuário final ou sistema.

### 1.2 Histórias de Usuário (User Stories)
- **Como** `[tipo de usuário]`,
- **Eu quero** `[funcionalidade desejada]`,
- **Para que** `[benefício de negócio]`.

### 1.3 Critérios de Aceite (Gherkin Format)
```gherkin
Cenário: [Nome do Cenário Principal]
  Dado que [pré-condição]
  Quando [ação realizada]
  Então [resultado esperado]
```

---

## 2. Especificação Arquitetural e de Domínio (`Scheduling.Domain`)

### 2.1 Entidades e Value Objects
- **Entidades Impactadas ou Novas:**
  - `NomeDaEntidade`: Descreva propriedades, comportamentos e invariantes.
- **Value Objects:**
  - `NomeDoValueObject`: Descreva imutabilidade e regras de validação inerentes.

### 2.2 Regras de Negócio e Invariantes
1. Regra 1: [Descrição detalhada da regra no Domínio]
2. Regra 2: [Descrição detalhada da regra no Domínio]

---

## 3. Especificação da Camada de Aplicação (`Scheduling.Application`)

### 3.1 DTOs (Data Transfer Objects)
- `RequestDTO`: [Estrutura de dados enviada pelo cliente]
- `ResponseDTO`: [Estrutura de dados retornada pela aplicação]

### 3.2 Validação de Entrada (FluentValidation)
- Classe de Validador: `NomeDoComandoOrQueryValidator : AbstractValidator<RequestDTO>`
- **Regras de Validação:**
  - Campo X: Obrigatório, formato Y.
  - Campo Z: Deve respeitar a faixa A-B.

### 3.3 Casos de Uso / Services
- Interface: `INomeDoService`
- Assinatura dos Métodos Assíncronos:
  ```csharp
  Task<Result<ResponseDto>> ExecuteAsync(RequestDto request, CancellationToken cancellationToken = default);
  ```

---

## 4. Especificação da API REST (`Scheduling.Api`)

### 4.1 Endpoints HTTP
- **Método:** `POST | GET | PUT | DELETE | PATCH`
- **Rota:** `/api/v1/[recurso]`
- **Autenticação/Autorização:** `[Bearer Token / Roles necessárias]`

### 4.2 Respostas HTTP Esperadas

| Código HTTP | Condição | Content-Type | Retorno |
| :--- | :--- | :--- | :--- |
| `200 OK` / `201 Created` | Sucesso na operação | `application/json` | `ResponseDTO` |
| `400 Bad Request` | Falha de Validação (FluentValidation) | `application/problem+json` | RFC 7807 Problem Details |
| `404 Not Found` | Recurso não localizado | `application/problem+json` | RFC 7807 Problem Details |
| `409 Conflict` | Conflito de estado / invariante | `application/problem+json` | RFC 7807 Problem Details |

---

## 5. Especificação do Frontend (`Frontend/src/app`)

### 5.1 Componentes Angular 21 Standalone
- **Componentes Novos/Modificados:**
  - `feature-name.component.ts` (Standalone, `ChangeDetectionStrategy.OnPush`)
- **Localização:** `src/app/features/[modulo]/` ou `src/app/shared/`

### 5.2 Serviços e Estado Reativo
- Serviço Angular: `FeatureNameService` (`providedIn: 'root'`)
- Reatividade: RxJS / Signals para estado local da tela.

### 5.3 UX/UI & Feedback Visual
- Uso do TailwindCSS e componentes com acessibilidade.
- Estados de UI: Loading, Sucesso, Validação de Formulário, Exibição de Erro.

---

## 6. Plano de Testes e Verificação Empírica

### 6.1 Testes no Backend (.NET 9)
- **Testes Unitários de Domínio & Aplicação:**
  - Validar FluentValidation para DTOs inválidos.
  - Validar comportamentos de entidades de domínio.
- **Comando de Execução:**
  ```powershell
  dotnet test .\Backend\Scheduling.Tests\ (ou equivalente)
  ```

### 6.2 Testes no Frontend (Angular 21 / Vitest)
- **Testes Unitários de Componente / Serviço:**
  - Testar `FeatureNameService` com HTTP mocking.
  - Testar rendering do componente e captura de eventos.
- **Comando de Execução:**
  ```powershell
  npm --prefix Frontend run test
  ```

---

## 7. Rastreabilidade de Código

| Componente | Arquivo Relacionado |
| :--- | :--- |
| **Domain** | `Backend/Scheduling.Domain/...` |
| **Application** | `Backend/Scheduling.Application/...` |
| **Infrastructure** | `Backend/Scheduling.Infrastructure/...` |
| **Api** | `Backend/Scheduling.Api/...` |
| **Frontend** | `Frontend/src/app/...` |
