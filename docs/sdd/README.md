# Guia de Especificação e Governança SDD (Spec-Driven Development)

Bem-vindo à documentação do sistema de **Desenvolvimento Orientado a Especificação (SDD)** do projeto **ScheduleNow**.

---

## 1. Visão Geral e Filosofia

No projeto **ScheduleNow**, o desenvolvimento de software e sua manutenção são orientados rigorosamente pela metodologia **Spec-Driven Development (SDD)**.

A regra fundamental do SDD é:
> **Nenhuma linha de código deve ser escrita, alterada ou removida sem que haja uma especificação formal (Spec) previa e devidamente registrada e alinhada.**

O SDD garante que:
1. **Clareza de Requisitos:** O *o quê* e o *porquê* são definidos antes do *como*.
2. **Rastreabilidade Total:** Cada alteração no código aponta diretamente para uma especificação correspondente.
3. **Qualidade Arquitetural:** Regras de Clean Architecture (.NET 9 e Angular 21) são mantidas e validadas explicitamente.
4. **Governança Unificada:** Tanto desenvolvedores humanos quanto Agentes de IA operam com o mesmo rigor, sem adivinhações ou premissas implícitas.

---

## 2. Estrutura de Diretórios em `docs/sdd/`

```
docs/sdd/
├── README.md                           # Este documento (Visão geral e introdução)
├── index.md                            # Registro/Catálogo central (Ledger) de todas as Specs
├── templates/                          # Modelos padronizados para criação de novas especificações
│   ├── feature-spec-template.md        # Especificações funcionais / novas features de negócio
│   ├── architecture-spec-template.md   # Decisões de Arquitetura (ADRs) e Infraestrutura
│   └── bugfix-spec-template.md         # Correções de bugs e manutenção evolutiva
├── workflows/                          # Guias operacionais e processos passo a passo
│   └── sdd-workflow-guide.md           # Guia de ciclo de vida do SDD para Devs e IA
└── specs/                              # Repositório de especificações ativas e históricas
    └── SPEC-000-sistema-base-sdd.md    # Especificação baseline do sistema
```

---

## 3. Ciclo de Vida de uma Especificação (Spec Lifecycle)

Toda especificação passa pelos seguintes estados no catálogo central ([index.md](file:///c:/projetos/ScheduleNow/docs/sdd/index.md)):

| Estado | Sigla | Descrição |
| :--- | :--- | :--- |
| **Draft** | `[DRAFT]` | Especificação em elaboração. Não está pronta para implementação. |
| **Under Review** | `[REVIEW]` | Em análise e alinhamento com stakeholders / time de engenharia. |
| **Approved** | `[APPROVED]` | Especificação aprovada. Pronta para ser implementada. |
| **In Progress** | `[IN_PROGRESS]` | Código em desenvolvimento guiado estritamente pela especificação. |
| **Implemented** | `[DONE]` | Código e testes concluídos, verificados empiricamente e integrados. |
| **Deprecated** | `[DEPRECATED]` | Especificação substituída ou tornado obsoleta por outra Spec. |

---

## 4. Referência Rápida para Desenvolvedores e Agentes de IA

1. Para criar uma nova funcionalidade, copie o modelo em [feature-spec-template.md](file:///c:/projetos/ScheduleNow/docs/sdd/templates/feature-spec-template.md) e salve em `docs/sdd/specs/SPEC-XXX-nome.md`.
2. Registre a nova Spec no ledger em [index.md](file:///c:/projetos/ScheduleNow/docs/sdd/index.md).
3. Siga o processo detalhado no [sdd-workflow-guide.md](file:///c:/projetos/ScheduleNow/docs/sdd/workflows/sdd-workflow-guide.md).
4. Consulte sempre a [constitution.md](file:///c:/projetos/ScheduleNow/constitution.md) do projeto para garantir a conformidade com os princípios imutáveis de engenharia.
