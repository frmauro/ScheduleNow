# SPEC-000: Arquitetura Base do Sistema & Governança SDD

> **Status:** `[DONE]`  
> **Tipo:** Arquitetura / Governança (`Architecture`)  
> **Domínio:** `Core / Base`  
> **Autor(es):** Equipe ScheduleNow  
> **Data de Criação:** 2026-08-04  
> **Última Atualização:** 2026-08-04  

---

## 1. Visão Geral e Contexto

Esta especificação define o alicerce fundamental do projeto **ScheduleNow**, estabelecendo a infraestrutura do ecossistema de software, a arquitetura de backend em Clean Architecture (.NET 9), a estrutura do frontend em Angular 21 Standalone e as regras de governança para o Desenvolvimento Orientado a Especificação (SDD).

---

## 2. Decisões Arquiteturais Fundamentais

### 2.1 Backend Architecture (.NET 9 C# 13)
O backend é estruturado em 4 projetos isolados respeitando os princípios de Clean Architecture:
- `Scheduling.Domain`: Contém entidades, Value Objects, exceções de domínio e interfaces de repositório. Zero dependências externas.
- `Scheduling.Application`: Contém casos de uso (Application Services), DTOs, validadores FluentValidation e interfaces de serviços externos.
- `Scheduling.Infrastructure`: Contém DbContext do Entity Framework Core 9, repositórios concretos e serviços de infraestrutura.
- `Scheduling.Api`: Contém ASP.NET Core Web API 9, controllers, middleware de tratamento global de exceções (RFC 7807) e configuração de injeção de dependência.

### 2.2 Frontend Architecture (Angular 21 / TypeScript 5.9 / Vitest)
O frontend é um Single Page Application (SPA) em Angular 21 utilizando exclusivamente componentes **Standalone**:
- `src/app/core/`: Serviços globais singleton, guards de rota, interceptors HTTP e modelos de contrato.
- `src/app/features/`: Módulos de telas de negócio (ex: agendamentos, clientes, serviços).
- `src/app/shared/`: Componentes UI reaproveitáveis, diretivas e pipes.
- **Testes Unitários:** Executados via Vitest com ambiente `jsdom`.

### 2.3 Sistema de Governança SDD
Toda modificação no repositório ScheduleNow é gerida pelos artefatos sob `docs/sdd/`:
- Matriz central de specs em `docs/sdd/index.md`.
- Guias de workflow em `docs/sdd/workflows/sdd-workflow-guide.md`.
- Templates formais para Features, Arquitetura e Bugfixes em `docs/sdd/templates/`.

---

## 3. Conformidade com a Constituição

- **Artigo I (SDD):** Especificação baseline registrada e ativa.
- **Artigo II (Clean Architecture):** Separação estrita de camadas e dependência unidirecional verificada.
- **Artigo III (Type Safety):** Habilitado `<Nullable>enable</Nullable>` no .NET e `strict: true` no TypeScript. Proibido tipo `any`.
- **Artigo IV (Validação & Erros):** FluentValidation para entradas e RFC 7807 Problem Details para respostas de erro HTTP.
- **Artigo V (Verificação Empírica):** Build e suíte de testes verificados.

---

## 4. Rastreabilidade de Artefatos de Código

| Componente | Artefato / Arquivo no Repositório |
| :--- | :--- |
| **Constituição** | [constitution.md](file:///c:/projetos/ScheduleNow/constitution.md) |
| **Documentação SDD** | [docs/sdd/README.md](file:///c:/projetos/ScheduleNow/docs/sdd/README.md) |
| **Catálogo Ledger SDD** | [docs/sdd/index.md](file:///c:/projetos/ScheduleNow/docs/sdd/index.md) |
| **Backend API** | `Backend/Scheduling.Api/` |
| **Backend Application** | `Backend/Scheduling.Application/` |
| **Backend Domain** | `Backend/Scheduling.Domain/` |
| **Backend Infrastructure** | `Backend/Scheduling.Infrastructure/` |
| **Frontend App** | `Frontend/src/app/` |
