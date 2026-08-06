# Regras de Governança para Agentes de IA (Workspace ScheduleNow)

Este repositório opera sob a metodologia **Spec-Driven Development (SDD)** definida na [constitution.md](file:///c:/projetos/ScheduleNow/constitution.md) e detalhada na documentação em [docs/sdd/](file:///c:/projetos/ScheduleNow/docs/sdd/README.md).

## Diretrizes Obrigatórias para Agentes de IA

1. **Consulta Prévia de Especificações:**
   - Antes de iniciar qualquer tarefa de desenvolvimento, refatoração ou correção de bug, inspecione a especificação correspondente em `docs/sdd/specs/` ou o catálogo em [docs/sdd/index.md](file:///c:/projetos/ScheduleNow/docs/sdd/index.md).
   - Se nenhuma especificação existir para uma nova solicitação de funcionalidade ou mudança arquitetural significativa, crie ou proponha a criação de um rascunho de Spec usando os modelos em `docs/sdd/templates/`.

2. **Rastreabilidade e Fidelidade Técnica:**
   - Mantenha estrito alinhamento com a arquitetura definida:
     - `Scheduling.Domain` sem dependências de infraestrutura.
     - Validação de entrada via FluentValidation em `Scheduling.Application`.
     - Respostas de erro no formato RFC 7807 (Problem Details).
     - Componentes Angular 21 Standalone sem o uso do tipo `any`.
   - Inspecione a fonte autoritativa no código antes de fazer suposições.

3. **Verificação Empírica Obrigatória:**
   - Sempre execute `dotnet build` e os testes pertinentes para comprovar empiricamente a conclusão da tarefa.
   - NUNCA oculte erros, remova testes que falharam ou silencie exceções para simular sucesso.
