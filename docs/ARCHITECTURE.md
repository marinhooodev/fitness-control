# CONTROL — arquitetura

> Arquitetura-alvo da v0.1.0  
> Sessões 1 a 4 implementadas no código; fechamento documental e QA físico permanecem para a Sessão 5.

## Objetivo arquitetural

Sustentar uma aplicação visualmente complexa e funcional usando somente dados locais, com o mínimo de abstração necessário para separar rotas, features, UI e estado.

Esta arquitetura não precisa receber backend no futuro. Simplicidade local é uma decisão permanente, não uma etapa temporária.

## Restrições

- Nenhuma requisição de rede faz parte do produto.
- Nenhum dado depende de servidor.
- Nenhuma senha é persistida.
- Não existem repository, adapter, DTO, API client ou server-state cache.
- Não existe provider de IA nem uma interface preparada para recebê-lo.
- Imagens e fontes de produto são locais.
- Web precisa compilar, mas não terá paridade obrigatória na v0.1.

## Organização planejada

```text
src/
  app/                    # rotas e layouts finos
    (auth)/
    (app)/
      (tabs)/
      workout/
  features/
    auth/
    onboarding/
    shell/
    workout/
    today/
    plan/
    progress/
    profile/
  ui/
    components/
    theme/
    motion/
  data/
    fixtures/
    demo-user.ts
    demo-workout.ts
  store/
    demo-store.ts
  shared/
    hooks/
    utils/
  types/
    demo.ts
```

Diretórios só devem ser criados quando receberem código real. Não construir uma árvore vazia por antecipação.

## Responsabilidades

### `src/app`

- Define URL, agrupamento, stack, tabs e opções de apresentação.
- Conecta uma rota ao componente principal da feature.
- Não contém fixture, cálculo, regra de negócio ou primitive visual complexa.

### `src/features`

- Agrupa tela, componentes específicos, hooks e funções puras da experiência.
- Pode importar fixtures diretamente.
- Não cria uma camada pública genérica se apenas uma feature usa o código.

### `src/ui`

- Contém tokens, temas, primitives e padrões visuais compartilhados.
- Não conhece usuário, treino ou regra de produto.
- Centraliza estados de interação e acessibilidade de componentes reutilizáveis.

### `src/data`

- Contém apenas dados demonstrativos estáticos e identificáveis.
- Usa TypeScript para permitir checagem no build.
- Não simula endpoints ou formatos de resposta HTTP.

### `src/store`

- Um store Zustand concentra somente estado compartilhado/persistente.
- Funções de feature que apenas calculam valores continuam fora do store.
- Persistência usa AsyncStorage e uma chave versionada.
- Tema, perfil, preferências, sessão e workout ativo ocupam o store persistido após a Sessão 4.

## Rotas da v0.1

```text
Root Stack
├── (auth)
│   ├── sign-in
│   ├── sign-up
│   └── onboarding
└── (app)
    ├── (tabs)
    │   ├── today
    │   ├── plan
    │   ├── progress
    │   └── you
    └── workout
        ├── preview
        └── active
```

A raiz aguarda hidratação antes de liberar as rotas protegidas de auth ou app. Isso evita mostrar por um frame a tela errada. `/(app)/index` redireciona para Today, dentro da árvore de tabs.

## Navegação

- Root Stack para auth, shell e workout.
- JavaScript Tabs do Expo Router para a área autenticada.
- `CONTROL Dock` fornecida como custom `tabBar`.
- O botão central não é uma quinta tab: ele abre preview ou sessão ativa.
- Workout ativo fica fora da tab tree e esconde a dock.
- Typed routes permanecem habilitadas.

Native tabs não serão usadas porque restringem a composição visual da dock. `expo-router/ui` experimental também não será a base de uma navegação essencial na v0.1.

## Modelo local

```ts
type ThemeMode = 'system' | 'light' | 'dark';

type TrainingGoal = 'strength' | 'conditioning' | 'balanced';
type EquipmentProfile = 'full-gym' | 'home' | 'minimal';
type WorkoutStatus = 'idle' | 'active' | 'paused' | 'completed';

interface DemoProfile {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
}

interface TrainingPreferences {
  goal: TrainingGoal;
  daysPerWeek: 3 | 4 | 5;
  equipment: EquipmentProfile;
}

interface DemoSession {
  profileId: string;
  signedInAt: string;
  onboardingComplete: boolean;
}

interface WorkoutSummary {
  id: string;
  title: string;
  focus: string;
  durationMinutes: number;
  exerciseCount: number;
}

interface ActiveWorkoutState {
  workoutId: string;
  status: WorkoutStatus;
  startedAt: string;
  pausedAt: string | null;
  accumulatedPauseMs: number;
}
```

O tipo final pode ganhar campos necessários à UI, mas não deve receber metadados de rede, sincronização ou servidor.

## Store público

Ações mínimas:

```ts
signInDemo(): void;
registerLocal(input): void;
signOut(): void;
completeOnboarding(preferences): void;
setTheme(mode): void;
startWorkout(workoutId): void;
pauseWorkout(): void;
resumeWorkout(): void;
finishWorkout(): void;
resetDemoData(): void;
```

Regras de persistência:

- Persistir perfil, sessão, onboarding, tema e treino ativo.
- Nunca persistir senha ou confirmação de senha.
- Logout remove somente a sessão.
- Reset remove todo o estado CONTROL e volta a `system`.
- Se a versão do estado persistido for incompatível durante o desenvolvimento, resetar o demo. Não criar migrations.

## Auth demonstrativa

### Demo profile

`Continue with demo profile` carrega Alex Morgan com preferências e histórico seeds.

### Cadastro

- Valida nome, e-mail, senha e confirmação.
- Cria um único perfil local.
- Descarta senha imediatamente.
- Envia para onboarding.

### Login

- Aceita apenas o e-mail do perfil local ou a ação direta de demo.
- Exige uma senha com formato válido para demonstrar estado do formulário.
- Não compara nem persiste credencial.
- Exibe `Offline demo — no real account is created`.

## Temas

- Preferência: system, light ou dark.
- `system` observa `useColorScheme`.
- Tema resolvido alimenta Expo Router, StatusBar e primitives.
- Feature screens usam somente tokens semânticos.
- A seleção manual persiste em AsyncStorage.

## Tempo do workout

Não persistir um contador incrementado a cada segundo. Persistir timestamps e pausas acumuladas; derivar o elapsed time na tela. Isso mantém o tempo coerente após background ou reload sem timers globais.

## Smart Adaptation futura

Na v0.4, uma função pura receberá plano e cenário local e devolverá preview adaptado com razões curadas. Ela não será chamada de modelo, não usará probabilidade fictícia e não terá alternativa remota.

```text
fixture + scenario -> deterministic rules -> adaptation preview -> apply or undo
```

## Assets

- Usar `require()` ou import estático.
- Não aceitar URL remota como source de produto.
- Guardar imagens finais por função, não por tela aleatória.
- Manter proveniência em `docs/ASSET_BRIEF.md`.

## Decisões adiadas

- Skia só será avaliado na v0.5 para Control Twin.
- Persistência de séries completas será detalhada na v0.3.
- Estrutura das regras de adaptação será detalhada na v0.4.
- Paridade web não será ampliada sem um novo plano.
