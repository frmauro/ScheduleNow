# SPEC-XXX: Fix - [Descrição Sucinta do Bug / Manutenção]

> **Status:** `[DRAFT | REVIEW | APPROVED | IN_PROGRESS | DONE | DEPRECATED]`  
> **Tipo:** Correção de Bug / Manutenção (`Bugfix`)  
> **Domínio:** `[ex: Agendamentos / API / Frontend / Persistência]`  
> **Autor(es):** `[Nome / IA]`  
> **Data de Criação:** `[AAAA-MM-DD]`  
> **Última Atualização:** `[AAAA-MM-DD]`  

---

## 1. Descrição do Bug e Sintomas Observados

### 1.1 Comportamento Incorreto Observado
Descreva o comportamento anômalo registrado (incluir mensagens de erro, logs ou capturas de tela se disponível).

### 1.2 Comportamento Esperado
Descreva exatamente o comportamento correto esperado do sistema.

### 1.3 Passos para Reprodução
1. ...
2. ...
3. ...

---

## 2. Análise de Causa Raiz Baseada em Evidências

### 2.1 Diagnóstico de Código / Logs
Citar o trecho de código ou log que originou o problema.
> *Importante:* Conforme a Constituição (Artigo V), o diagnóstico deve ser comprovado por evidências de execução ou inspeção de código fonte.

### 2.2 Componentes e Camadas Afetadas
- [ ] Backend: `Scheduling.Domain`
- [ ] Backend: `Scheduling.Application`
- [ ] Backend: `Scheduling.Infrastructure`
- [ ] Backend: `Scheduling.Api`
- [ ] Frontend: `Angular Components / Services`

---

## 3. Especificação da Correção

### 3.1 Alterações de Código Propostas
Descreva o ajuste necessário em cada arquivo afetado.

### 3.2 Atualização de Especificações Existentes
Caso o bug reflita uma lacuna em uma Spec anterior (`SPEC-YYY`), indicar a atualização necessária nessa Spec.

---

## 4. Estratégia de Teste de Regressão e Verificação Empírica

### 4.1 Novo Cenário de Teste (Test-Driven Fix)
- Descreva o teste unitário/integração escrito para reproduzir e comprovar a correção do bug.
- O teste DEVE falhar antes da correção e passar após a aplicação da correção.

### 4.2 Execução de Verificação Empírica
- **Backend:** `dotnet test`
- **Frontend:** `npm --prefix Frontend run test`
