# ScheduleNow 📅

Sistema moderno de agendamentos e gestão de serviços desenvolvido com **Clean Architecture**, **.NET 9 (C# 13)** no Backend e **Angular 21 (Componentes Standalone)** no Frontend.

---

## 🏛️ Metodologia e Governança: Spec-Driven Development (SDD)

O desenvolvimento e a manutenção deste repositório são orientados exclusivamente por **SDD (Spec-Driven Development / Desenvolvimento Orientado a Especificação)**.

- 📜 **Constituição do Projeto:** Consubstanciada em [constitution.md](file:///c:/projetos/ScheduleNow/constitution.md), contendo as regras imutáveis de arquitetura, segurança de tipos e qualidade.
- 📋 **Documentação e Guias SDD:** Localizados na pasta [`docs/sdd/`](file:///c:/projetos/ScheduleNow/docs/sdd/README.md).
- 🗂️ **Catálogo Central de Especificações (Ledger):** Acesse [docs/sdd/index.md](file:///c:/projetos/ScheduleNow/docs/sdd/index.md) para consultar o status de todas as especificações (`SPEC-000`, `SPEC-001`, ...).
- 📑 **Templates de Especificação:**
  - [Funcionalidades / Features](file:///c:/projetos/ScheduleNow/docs/sdd/templates/feature-spec-template.md)
  - [Decisões Arquiteturais / ADR](file:///c:/projetos/ScheduleNow/docs/sdd/templates/architecture-spec-template.md)
  - [Correções de Bugs / Fixes](file:///c:/projetos/ScheduleNow/docs/sdd/templates/bugfix-spec-template.md)
- 🔄 **Fluxo de Trabalho Operacional:** Veja [docs/sdd/workflows/sdd-workflow-guide.md](file:///c:/projetos/ScheduleNow/docs/sdd/workflows/sdd-workflow-guide.md).

---

## 🛠️ Tecnogias e Arquitetura

### Backend (.NET 9 C# 13)
- **Framework:** ASP.NET Core Web API 9.0
- **Persistência:** Entity Framework Core 9.0
- **Validação:** FluentValidation 12.1+
- **Padrão de Erro:** RFC 7807 Problem Details
- **Estrutura:** Clean Architecture (`Domain`, `Application`, `Infrastructure`, `Api`)

### Frontend (Angular 21)
- **Framework:** Angular 21 (Componentes Standalone)
- **Estilização:** TailwindCSS 3.4+ & SCSS
- **Tipagem:** TypeScript 5.9+ (`strict: true`)
- **Testes Unitários:** Vitest 4.0+ com `jsdom`

---

## 🚀 Comandos de Compilação e Execução

### Script Completo (Backend + Frontend)
```powershell
# Executar script automatizado (Build + Run Backend & Frontend)
.\run.ps1
# Ou via CMD / Prompt de Comando
.\run.bat
```

### Backend (.NET 9)
```powershell
# Compilar a Web API
dotnet build .\Backend\Scheduling.Api\

# Executar testes unitários e de integração
dotnet test .\Backend\
```

### Frontend (Angular 21)
```powershell
# Instalar dependências
npm --prefix Frontend install

# Executar testes unitários com Vitest
npm --prefix Frontend test

# Compilar para produção
npm --prefix Frontend run build
```

---

*ScheduleNow - Guiado por Especificação e Governança SDD.*
