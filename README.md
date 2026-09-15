# CONTROL

CONTROL é um projeto mobile de portfólio, visual-first, construído com React Native, Expo e TypeScript. O conceito é um centro de comando adaptativo para treino híbrido, com fluxos locais, visualização de dados e adaptações “inteligentes” determinísticas.

O projeto é permanentemente **mock-only e offline-first**:

- sem backend ou banco de dados;
- sem autenticação real;
- sem IA remota ou LLM;
- sem serviços pagos;
- sem imagens remotas em runtime.

## Estado atual

A Sessão 2 da v0.1.0 entrega o design system compartilhado: tokens semânticos, fontes locais Manrope e Barlow Condensed, tema system/light/dark persistido, primitives acessíveis, motion com reduce motion, Sheet gestual e identidade vetorial provisória. A rota inicial funciona temporariamente como vitrine interativa desses fundamentos.

Auth, onboarding, tabs, CONTROL Dock e workout ainda não existem. Essas partes pertencem às próximas sessões descritas no plano de implementação; nenhuma integração remota foi adicionada.

## Requisitos

- Node.js 22.13 ou superior;
- npm;
- Expo Go no Android ou iPhone usado para teste;
- Android Studio somente para emulador Android;
- macOS e Xcode somente para iOS Simulator.

No Windows, a validação de iOS deve ser feita em iPhone físico com Expo Go.

## Instalação

```bash
npm install
```

## Execução

```bash
npm run start
```

O terminal exibe um QR code. Para Android, abra pelo Expo Go; no iPhone, leia o código com a câmera e abra no Expo Go. Se o aparelho não alcançar o servidor pela rede local, tente:

```bash
npx expo start --tunnel
```

Para limpar um cache antigo do Metro:

```bash
npx expo start --clear
```

## Qualidade

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:ci
```

Os mesmos checks rodam no GitHub Actions. `npm run test` inicia o Jest em modo watch e `npm run format` aplica o Prettier.

## Fluxo Git

Não faça commits diretamente em `main`. Toda tarefa deve nascer da `main` atualizada em uma branch `feature/`, `bugfix/` ou `docs/`, e os commits seguem Conventional Commits. O processo completo e exemplos estão em [CONTRIBUTING.md](CONTRIBUTING.md).

## Documentação

- [Visão de produto](docs/PRODUCT_VISION.md)
- [Plano de implementação](docs/IMPLEMENTATION_PLAN.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Asset brief e prompts](docs/ASSET_BRIEF.md)
- [Qualidade e fechamento](docs/QUALITY.md)
- [Regras para agentes](AGENTS.md)

## Referências oficiais do Expo

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Desenvolvimento com Expo](https://docs.expo.dev/get-started/start-developing/)
- [Unit testing com Jest](https://docs.expo.dev/develop/unit-testing/)
- [ESLint e Prettier](https://docs.expo.dev/guides/using-eslint/)
