# Constitucionalidade do Projeto: ScheduleNow
> **Padrão SDD (Spec-Driven Development)**  
> **Versão da Constituição:** 1.0.0  
> **Data de Vigência:** 2026-07-23  
> **Status:** Ativo e Imutável  

---

## 1. Preâmbulo e Escopo de Governança

Esta Constituição estabelece as regras imutáveis de engenharia de software, decisões de arquitetura, padrões de qualidade de código, restrições tecnológicas e diretrizes de governança operacional para o projeto **ScheduleNow**.

Todas as modificações de código, refatorações, criação de funcionalidades ou intervenções realizadas por **Agentes de Inteligência Artificial** ou **desenvolvedores humanos** DEVEM aderir estritamente aos princípios e regras enumerados neste documento. Nenhuma especificação de funcionalidade (Spec) ou solicitação de código pode revogar ou violar os artigos desta Constituição.

---

## 2. Princípios Fundamentais Imutáveis (Core Principles)

### Artigo I: Desenvolvimento Guiado por Especificação (Spec-Driven Development - SDD)
1. **Especificação Prévia Obrigatória:** Nenhuma linha de código deve ser escrita, modificada ou removida sem que haja uma especificação clara (Spec) aprovada ou alinhada com o escopo do projeto.
2. **Rastreabilidade:** Cada alteração no repositório deve ter uma justificativa explícita ligada às regras de negócio ou requisitos técnicos especificados.
3. **Não-Assunção:** O agente ou desenvolvedor NUNCA deve presumir comportamentos, assinaturas de API ou estruturas de dados sem inspecionar a fonte autoritativa no código-fonte ou nas especificações.

### Artigo II: Integridade Arquitetural (Clean Architecture)
1. **Independência do Domínio:** A camada `Scheduling.Domain` é o núcleo absoluto da aplicação. Ela NUNCA pode ter dependências de frameworks externos, Entity Framework, ASP.NET Core ou bibliotecas de infraestrutura.
2. **Direção de Dependência Unidirecional:**
   - `Scheduling.Domain` (Zero dependências externas)
   - `Scheduling.Application` -> Depende apenas de `Scheduling.Domain`
   - `Scheduling.Infrastructure` -> Implementa interfaces de `Scheduling.Application` e `Scheduling.Domain`
   - `Scheduling.Api` -> Orquestra e injeta as dependências de `Infrastructure` e `Application`
3. **Organização no Frontend:** O aplicativo Angular em `Frontend/` deve manter separação estrita entre:
   - `core/` (Serviços singleton globais, guards, interceptors, modelos de domínio)
   - `features/` (Módulos funcionais e telas de negócios)
   - `shared/` (Componentes apresentacionais reutilizáveis, pipes, diretivas)

### Artigo III: Segurança de Tipos e Legibilidade (Type Safety & Zero Magic)
1. **Tipagem Estrita (Strict Typing):**
   - **Backend (C# .NET 9):** Habilitado `<Nullable>enable</Nullable>`. O uso de `object` genérico ou conversões inseguras sem type-check é proibido.
   - **Frontend (TypeScript 5.9):** Habilitado `strict: true`. O uso do tipo `any` é estritamente PROIBIDO. Use tipos explícitos, interfaces, `unknown` ou generics com constraints.
2. **Sem Valores Mágicos (No Magic Numbers/Strings):** Constantes, enums e configurações fortemente tipadas devem ser utilizados para evitar valores literais espalhados pelo código.

### Artigo IV: Validação Defensiva e Tratamento de Erros
1. **Falhe Rapidamente (Fail-Fast):** Requisições inválidas devem ser rejeitadas no limite da aplicação (entrada da API ou formulários no Frontend) antes de executarem lógica de domínio ou persistência.
2. **Validação Backend:** Toda validação de dados de entrada na camada Application deve ser feita utilizando **FluentValidation**. As regras de validação devem ser isoladas em classes `AbstractValidator<T>`.
3. **Padrão de Resposta de Erro:** Todas as exceções da API devem ser tratadas centralizadamente (via Middleware Global ou Exception Handler) e convertidas no padrão **RFC 7807 (Problem Details)**. Expor stack traces em ambiente de produção é estritamente proibido.

### Artigo V: Qualidade, Testabilidade e Verificação Empírica
1. **Testes Automáticos:** Nenhuma refatoração ou funcionalidade crítica é considerada concluída sem a respectiva suíte de testes cobrindo os cenários esperados.
   - **Backend:** Testes unitários validando Application Services, Validators e entidades de Domain.
   - **Frontend:** Testes em **Vitest** com ambiente `jsdom`.
2. **Verificação Empírica Obrigatória:** O agente NUNCA pode declarar que um bug foi corrigido ou uma funcionalidade foi concluída sem executar os comandos de verificação (`dotnet build`, `ng build`, suítes de teste) para comprovar empiricamente a integridade da aplicação.

---

## 3. Matriz de Tecnologia e Restrições (Tech Stack Boundaries)

### 3.1 Backend Stack (.NET 9)
- **Runtime & Framework:** .NET 9.0 (C# 13)
- **Engine API:** ASP.NET Core Web API / OpenAPI (Swashbuckle 7.2 / Microsoft.AspNetCore.OpenApi 9.0)
- **Persistência & ORM:** Entity Framework Core 9.0 (`Microsoft.EntityFrameworkCore.Design`)
- **Validação:** FluentValidation 12.1+ com Injeção de Dependência
- **Autenticação & Autorização:** JWT Bearer (`Microsoft.AspNetCore.Authentication.JwtBearer` 9.0)

### 3.2 Frontend Stack (Angular 21)
- **Framework UI:** Angular 21 (Componentes Standalone)
- **Linguagem:** TypeScript 5.9+
- **Estilização:** TailwindCSS 3.4+ & SCSS
- **Ícones:** Lucide Angular (`lucide-angular`)
- **Autenticação:** `jwt-decode`
- **Testes Unitários:** Vitest 4.0+ & `jsdom`
- **Gerenciador de Pacotes:** npm (`npm@10.9+`)

### 3.3 Adição de Novas Dependências
- É **proibido** instalar novos pacotes NuGet ou bibliotecas npm sem justificativa explícita documentada na especificação da funcionalidade. Priorizar sempre recursos nativos do .NET 9 e Angular 21.

---

## 4. Convenções de Código e Diretrizes Arquiteturais

### 4.1 Estrutura de Diretórios
```
ScheduleNow/
├── Backend/
│   ├── Scheduling.Api/          # Controllers, Middlewares, Program.cs, Configuration
│   ├── Scheduling.Application/  # DTOs, Interfaces, Services, Validators (FluentValidation)
│   ├── Scheduling.Domain/       # Entities, Value Objects, Enums, Interfaces de Repositório
│   └── Scheduling.Infrastructure/# EF Core DbContext, Migrations, Repositories, External Services
├── Frontend/
│   ├── src/app/
│   │   ├── core/                # Serviços Singleton, Interceptors, Guards, Models globais
│   │   ├── features/            # Módulos funcionais (ex: employees, appointments, clients)
│   │   └── shared/              # Componentes UI apresentacionais, Pipes, Directives
├── constitution.md              # Este documento (Regras Imutáveis SDD)
└── README.md                    # Documentação geral do repositório
```

### 4.2 Convenções no Backend (C#)
1. **Nomenclatura:**
   - Classes, Métodos e Propriedades: `PascalCase`
   - Interfaces: `IPascalCase` (ex: `IEmployeeService`)
   - Variáveis Locais e Parâmetros: `camelCase`
   - Campos Privados Injetados: `_camelCase`
2. **Programação Assíncrona:**
   - Todos os métodos de I/O (banco de dados, chamadas externas) DEVEM ser assíncronos e utilizar o sufixo `Async` (ex: `GetByIdAsync`).
   - Propagar sempre `CancellationToken cancellationToken = default`.

### 4.3 Convenções no Frontend (Angular)
1. **Componentes Standalone:** Todos os novos componentes DEVEM utilizar `standalone: true`.
2. **Nomenclatura de Arquivos:** Utilizar o padrão kebab-case (`employee-list.component.ts`, `employee.service.ts`).
3. **Reatividade:** Priorizar o uso de RxJS e Signals para gerenciamento de estado e dados reativos.

---

## 5. Regras Imutáveis de Comportamento para Agentes de IA

Ao executar qualquer tarefa neste repositório, o Agente de IA deve obrigatoriamente seguir este fluxo:

1. **Leitura e Diagnóstico Antes da Ação:** Inspecionar o código existente antes de propor edições. NUNCA adivinhar estruturas ou assinaturas.
2. **Diagnóstico Baseado em Evidências (Logs Primeiro):** Diante de um erro, ler o log/stack trace completo antes de formular qualquer hipótese.
3. **Sem Soluções Mascaradas:** NUNCA silenciar exceções, remover testes que falharam ou ocultar erros para fingir a conclusão da tarefa.
4. **Respeito aos Contratos:** Modificações em contratos de API ou modelos de dados exigem a atualização de todos os pontos consumidores no Backend e Frontend.

---

## 6. Alterações e Emendas da Constituição

- **Status de Supremana:** Este documento sobressai qualquer instrução de código ad-hoc ou especificação individual.
- **Processo de Revisão:** Mudanças nesta Constituição só devem ser realizadas mediante solicitação explícita de alteração de diretrizes do projeto, com atualização do número de versão e registro formal.

---
*Documento oficial estabelecido sob a metodologia Spec-Driven Development (SDD) para o repositório ScheduleNow.*
