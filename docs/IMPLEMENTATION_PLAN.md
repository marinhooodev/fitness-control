# CONTROL — plano de implementação

> Alvo ativo: v0.1.0 — Functional Shell  
> Status: em implementação — Sessão 2 concluída no código; smoke em dispositivos pendente
> Este documento organiza trabalho futuro; nenhuma etapa descrita aqui deve ser considerada concluída sem evidência.

## Estratégia

A ordem de construção será:

1. contrato visual suficiente para evitar decisões improvisadas;
2. baseline executável e verificável;
3. carcaça completa com navegação e estado local;
4. features verticais adicionadas por versão;
5. polish e material de portfólio.

Não será criado um design completo de todas as features antes do código. Cada versão futura terá sua própria rodada curta de detalhamento, mas toda sessão de implementação deve terminar com o app executável.

## Estado atual

- A Sessão 2 substituiu a baseline por uma vitrine interna temporária do design system.
- `package.json` e `app.json` estão em `0.1.0`; nome, slug e scheme usam a identidade CONTROL.
- Tokens semânticos, tipografia, motion, elevação e primitives compartilhadas vivem em `src/ui`.
- Manrope e Barlow Condensed são carregadas de arquivos empacotados; não existe carregamento remoto.
- O tema system/light/dark é resolvido pelo `ControlThemeProvider` e persistido localmente no store Zustand.
- O Sheet local usa Modal, Gesture Handler e Reanimated, incluindo gesto de dismiss e reduce motion.
- Símbolo, wordmark e splash provisórios têm fontes vetoriais locais e componentes SVG.
- TypeScript permanece em strict mode e não existem CSS modules.
- ESLint flat, Prettier, Jest Expo e React Native Testing Library estão configurados.
- Os gates `lint`, `typecheck` e `test:ci`, o Expo Doctor e o export Android/iOS/web passam localmente.
- O smoke visual web cobre os temas light/dark, persistência após reload e o Sheet; Android e iPhone físico continuam pendentes.
- A vitrine cobre estados de botões, campos, chips, cards, mensagens, avatares e o Sheet nos dois temas.
- Auth, tabs e demais features permanecem fora da árvore, conforme o limite da Sessão 2.

## Resultado da v0.1.0

Ao final, uma pessoa deverá conseguir:

1. abrir CONTROL no Android ou iPhone com Expo Go;
2. entrar usando o perfil demo;
3. criar um perfil local e concluir onboarding;
4. navegar entre Today, Plan, Progress e You;
5. alternar entre system, light e dark;
6. iniciar, pausar, retomar e finalizar uma sessão mock mínima pelo botão central;
7. sair da conta sem perder o perfil;
8. resetar todos os dados demonstrativos;
9. entender pelo README como instalar, executar e validar o projeto.

## Sessão 1 — contrato e baseline

### Objetivo

Substituir a identidade do starter por uma baseline CONTROL mínima, sem começar features de produto.

### Trabalho

- Ler `AGENTS.md` e os documentos de produto, arquitetura, design e qualidade.
- Consultar a documentação exata do Expo SDK 57 para os módulos usados.
- Atualizar o nome de exibição para `CONTROL`, slug para `control-fitness`, scheme para `control` e versão para `0.1.0`.
- Remover starter components e assets somente quando seus substitutos já existirem.
- Eliminar a dependência de CSS modules e corrigir o typecheck inicial.
- Configurar ESLint flat, Prettier, Jest Expo e React Native Testing Library.
- Adicionar scripts `typecheck`, `test` e `test:ci`.
- Exibir uma tela temporária CONTROL usando safe area, temas e splash controlado.

### Fechamento da sessão

- [ ] App abre no Expo Go em Android e iPhone.
- [x] Bundles de Android, iOS e web são gerados; o export web abre sem red screen.
- [x] Typecheck não possui os erros de CSS do starter.
- [x] O starter não aparece visualmente.
- [x] Não há ainda auth, tabs ou features parciais escondidas.

## Sessão 2 — design system

### Objetivo

Criar os fundamentos visuais reutilizáveis antes da carcaça.

### Trabalho

- Implementar tokens semânticos de light/dark, grid, tipografia, radius, border, elevation e motion.
- Empacotar Manrope para interface e Barlow Condensed para números/títulos de performance.
- Criar primitives: Screen, Text, Button, IconButton, TextField, Card, Chip, Avatar, Divider e FormMessage.
- Criar Sheet local usando Modal, Gesture Handler e Reanimated, sem dependência externa.
- Implementar ThemeProvider com system/light/dark.
- Criar logo, wordmark e splash provisórios vetoriais.
- Adicionar amostras internas temporárias para verificar todos os componentes nos dois temas; remover a vitrine quando os fluxos reais a substituírem.

### Fechamento da sessão

- [x] Primitives possuem estados normal, pressed, focused, disabled e error quando aplicável.
- [x] Alvos de toque importantes têm pelo menos 44 × 44 pontos por contrato de token.
- [ ] Fonte ampliada não corta ações essenciais em Android e iPhone físicos.
- [x] Reduce motion remove transformações decorativas no código; smoke em dispositivo permanece pendente.
- [x] App continua abrindo numa tela CONTROL válida e verificável pela vitrine interna.

## Sessão 3 — auth e onboarding locais

### Objetivo

Entregar um fluxo de entrada completo, persistido e honesto sobre sua natureza demonstrativa.

### Rotas

```text
/
/(auth)/sign-in
/(auth)/sign-up
/(auth)/onboarding
/(app)/...
```

### Comportamento

- A rota raiz aguarda hidratação de fontes e AsyncStorage antes de redirecionar.
- `Continue with demo profile` cria/restaura o perfil Alex Morgan e entra diretamente no app.
- Sign-up coleta nome, e-mail, senha e confirmação; valida os campos, descarta a senha e cria o perfil local.
- Onboarding coleta objetivo, frequência e equipamento em três passos.
- Sign-in reconhece o e-mail do perfil local; qualquer senha sintaticamente válida é descartada.
- E-mail desconhecido direciona a pessoa para criar o perfil.
- Logout limpa somente a sessão.
- Reset demo data limpa sessão, perfil, preferências, treino e tema após confirmação.
- A interface de autenticação contém um aviso discreto `Offline demo — no real account is created`.

### Fechamento da sessão

- Os dois caminhos, demo e cadastro, chegam a uma tela autenticada temporária.
- Encerrar e reabrir o app preserva sessão e onboarding.
- Senha não aparece no estado persistido.
- Logout e reset têm resultados diferentes e testados.

## Sessão 4 — app shell e CONTROL Dock

### Objetivo

Entregar a carcaça navegável que receberá as features das próximas versões.

### Rotas

```text
/(app)/(tabs)/today
/(app)/(tabs)/plan
/(app)/(tabs)/progress
/(app)/(tabs)/you
/(app)/workout/preview
/(app)/workout/active
```

### Navegação

- Root Stack controla auth, app e workout.
- Tabs JavaScript estáveis do Expo Router recebem uma `tabBar` própria.
- A dock flutua sobre o conteúdo e respeita safe-area e teclado.
- Quatro tabs cercam o botão central Start Workout.
- A tab ativa exibe label e indicador animado; inativas mantêm somente ícone.
- O botão central abre preview quando não existe sessão.
- Quando existe sessão ativa, o botão mostra progresso circular e retorna a `/workout/active`.
- Workout ativo esconde a dock para reduzir distração.

### Telas mínimas

- Today: saudação, data, resumo da sessão seed e acesso ao preview.
- Plan: semana seed em formato simples e estado `Full planning arrives in v0.4` apresentado como nota informativa, sem CTA morto.
- Progress: três métricas seed e nota de versão futura.
- You: perfil, preferências, tema, logout e reset.
- Workout preview: objetivo, duração, três exercícios e ação Start.
- Workout active: elapsed time, status, pausa/retomada e Finish.

### Fechamento da sessão

- Todas as tabs são navegáveis.
- Back behavior é previsível no Android.
- Dock funciona em light/dark, safe areas diferentes e reduce motion.
- Start, pause, resume e finish atualizam estado persistido.
- Nenhuma ação primária está morta.

## Sessão 5 — documentação, QA e fechamento da versão

### Trabalho

- Atualizar README para remover linguagem de “planejado” que já tiver sido entregue.
- Preencher `CHANGELOG.md` com v0.1.0.
- Finalizar `docs/ASSET_BRIEF.md` com qualquer decisão visual descoberta durante a implementação.
- Executar testes automatizados e a matriz manual de `docs/QUALITY.md`.
- Validar Android e iPhone físico via Expo Go.
- Executar export de bundle para encontrar imports ou assets ausentes.
- Capturar uma imagem de cada fluxo principal em light e dark para referência interna.
- Confirmar que não há requests de rede, senhas persistidas ou dependências fora da política.

### Versão fechada quando

- Todos os gates de `docs/QUALITY.md` passam.
- `package.json` e `app.json` indicam `0.1.0`.
- README representa exatamente o estado entregue.
- Git diff contém apenas alterações intencionais.
- Nenhum commit, tag ou publicação é criado sem pedido explícito do usuário.

## Dependências planejadas para v0.1

Runtime:

- `@react-native-async-storage/async-storage` — estado local persistente;
- `zustand` — store pequeno entre rotas;
- `expo-haptics` — feedback tátil;
- `expo-linear-gradient` — glows e superfícies de marca;
- `react-native-svg` — ícones e gráficos vetoriais;
- `lucide-react-native` — iconografia consistente;
- pacotes Expo Google Fonts para Manrope e Barlow Condensed.

Desenvolvimento:

- `eslint` e `eslint-config-expo`;
- `prettier` e `eslint-config-prettier`;
- `jest`, `jest-expo` e `@types/jest`;
- `@testing-library/react-native`.

Toda dependência deve ser instalada com uma versão compatível com Expo SDK 57. Skia, chart libraries, form libraries e bottom sheets externos estão proibidos nesta versão.

## Roadmap posterior

### v0.2.0 — Today Command Center

Control Score demonstrativo, readiness, recomendação do dia, agenda semanal curta e painel `Why this session?`.

### v0.3.0 — Live Workout

Registro de séries, reps, carga, RPE/RIR, descanso, haptics, substituição de exercício, pausa e recap.

### v0.4.0 — Plan + Smart Adaptation

Timeline semanal e cenários locais — pouco tempo, sono ruim, equipamento limitado e academia cheia — com preview, apply e undo. Não haverá chat.

### v0.5.0 — Progress + Control Twin

Gráficos SVG, calendário de consistência, recordes e mapa corporal interativo alimentados por histórico seed e sessões locais.

### v0.6.0 — Portfolio Release

Polish cross-platform, acessibilidade, performance, share card, screenshots, vídeo e case study.

Cada versão posterior exige um plano próprio antes de implementação.
