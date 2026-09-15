# Contribuindo com o CONTROL

Este repositório usa branches curtas, commits convencionais e uma `main` sempre integrável. Não faça commits ou pushes diretamente em `main`.

## Fluxo de branches

Toda tarefa começa na versão atualizada de `main`:

```bash
git switch main
git pull --ff-only
git switch -c <tipo>/<descricao-curta>
```

Prefixos aceitos:

- `feature/` para funcionalidade ou incremento planejado;
- `bugfix/` para correção de comportamento;
- `docs/` para alteração exclusivamente documental.

Use nomes em inglês, minúsculos e separados por hífen, por exemplo:

```text
feature/v0.1-session-1
bugfix/android-safe-area
docs/local-setup
```

Uma branch deve representar uma única tarefa. Se a branch depender de trabalho ainda não integrado, aguarde a integração ou registre explicitamente a exceção; a origem padrão continua sendo `main`.

## Conventional Commits

Use o formato:

```text
<tipo>(<escopo opcional>): <descrição imperativa e curta>
```

Tipos principais:

- `feat`: comportamento novo visível no produto;
- `fix`: correção de defeito;
- `docs`: documentação apenas;
- `test`: testes sem mudança de comportamento;
- `refactor`: reorganização sem alterar comportamento;
- `style`: formatação sem alteração lógica;
- `perf`: melhoria de desempenho;
- `build`: dependências ou build;
- `ci`: automação de integração;
- `chore`: manutenção que não cabe nos tipos anteriores;
- `revert`: reversão explícita de outro commit.

Exemplos:

```text
feat(baseline): establish CONTROL session one
fix(theme): keep status bar legible in dark mode
docs(workflow): document branch and commit conventions
```

Evite mensagens vagas como `updates`, `fix stuff` ou `wip`. Commits devem ser pequenos, coerentes e deixar o projeto executável sempre que possível.

## Antes de publicar a branch

Revise o diff e execute:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:ci
```

O GitHub repete esses checks automaticamente. A política de pull requests e a proteção remota de `main` serão configuradas separadamente; até lá, a regra do projeto continua sendo integrar mudanças somente por uma branch dedicada.
