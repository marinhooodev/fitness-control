# CONTROL — design system

> Contrato visual inicial da v0.1.0  
> Valores devem ser verificados em telas reais antes de serem considerados finais.

Implementação atual: tokens, fontes, primitives, tema persistido, identidade vetorial e Sheet foram materializados na Sessão 2. Na Sessão 3, os fluxos reais de auth e onboarding substituíram a vitrine interna; os testes das primitives foram preservados junto aos componentes.

## Direção

CONTROL mistura energia esportiva com precisão técnica. A interface deve parecer premium e cinética, sem assumir a estética de hospital, dashboard corporativo ou cyberpunk genérico.

Palavras-guia:

- athletic;
- precise;
- kinetic;
- premium;
- focused;
- adaptive.

## Marca

- Nome exibido: `CONTROL` em caixa alta.
- Tagline: `Your body changes every day. Your plan should too.`
- O wordmark deve ser tipográfico e funcionar sem fotografia.
- O símbolo provisório deve combinar um `C` aberto com uma marca de pulso/progresso.
- Logo e ícone não usam halteres, bíceps, coração ou raio como símbolo literal.

## Temas

### Dark

| Token             | Valor inicial | Uso                           |
| ----------------- | ------------- | ----------------------------- |
| `canvas`          | `#080A09`     | Fundo principal               |
| `surface`         | `#121513`     | Cards e dock                  |
| `surfaceElevated` | `#1A1F1C`     | Sheets e superfícies elevadas |
| `textPrimary`     | `#F3F6F2`     | Texto principal               |
| `textSecondary`   | `#98A29B`     | Texto auxiliar                |
| `border`          | `#2A312C`     | Bordas e divisores            |
| `brand`           | `#C8FF3D`     | Ação principal e progresso    |
| `brandInk`        | `#142000`     | Conteúdo sobre brand          |
| `info`            | `#72DCE8`     | Recuperação e informação      |
| `warning`         | `#FFB45C`     | Atenção                       |
| `danger`          | `#FF6B5F`     | Erro e esforço alto           |

### Light

| Token             | Valor inicial | Uso                           |
| ----------------- | ------------- | ----------------------------- |
| `canvas`          | `#F2F5F0`     | Fundo principal               |
| `surface`         | `#FFFFFF`     | Cards e dock                  |
| `surfaceElevated` | `#E7ECE5`     | Sheets e superfícies elevadas |
| `textPrimary`     | `#0B0E0C`     | Texto principal               |
| `textSecondary`   | `#626D65`     | Texto auxiliar                |
| `border`          | `#D2DAD1`     | Bordas e divisores            |
| `brand`           | `#B7EF2F`     | Ação principal e progresso    |
| `brandInk`        | `#111800`     | Conteúdo sobre brand          |
| `info`            | `#087E8A`     | Recuperação e informação      |
| `warning`         | `#A85600`     | Atenção                       |
| `danger`          | `#B8382D`     | Erro e esforço alto           |

Brand não deve ser usado como texto pequeno sobre canvas claro. Cores semânticas precisam ser validadas em contraste e daltonismo antes do fechamento.

## Tipografia

### Famílias

- **Manrope:** navegação, corpo, labels, botões e formulários.
- **Barlow Condensed:** métricas, scores, timers e títulos heroicos.

As fontes são empacotadas localmente. Não carregar Google Fonts pela rede.

### Escala inicial

| Papel   | Fonte            | Tamanho/linha | Peso |
| ------- | ---------------- | ------------- | ---- |
| Display | Barlow Condensed | 64/64         | 700  |
| Metric  | Barlow Condensed | 40/42         | 700  |
| Title   | Manrope          | 28/34         | 700  |
| Heading | Manrope          | 20/26         | 700  |
| Body    | Manrope          | 16/24         | 500  |
| Label   | Manrope          | 14/18         | 700  |
| Caption | Manrope          | 12/16         | 600  |

- Respeitar font scaling do sistema.
- Números tabulares devem ser usados em timer e séries quando a família suportar.
- Texto em caixa alta fica reservado à marca e micro-labels curtas.

## Espaçamento e forma

- Grid base: 4 pontos.
- Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- Padding horizontal padrão de telefone: 20.
- Gap padrão de seção: 24.
- Radius de controles: 12.
- Radius de cards: 20.
- Radius de superfícies hero: 28.
- Alvo mínimo de toque: 44 × 44.
- Conteúdo nunca fica escondido atrás da CONTROL Dock.

## Superfícies

- Fundo principal usa cor sólida com luz localizada ou gradiente muito discreto.
- Cards comuns usam surface + border; não precisam de sombra em dark mode.
- Sheets e elementos flutuantes usam surfaceElevated.
- Glass é reservado para a dock e overlays que realmente pairam sobre conteúdo.
- No iOS compatível, `expo-glass-effect` pode aprimorar a superfície.
- Em qualquer fallback, a composição base já deve parecer final usando cor, borda e elevação.

## CONTROL Dock

A dock é a principal assinatura da v0.1.

### Geometria

- Inset lateral: 16.
- Distância da safe area inferior: 8.
- Altura base: 72.
- Radius externo: 28.
- Botão central: 60 × 60, elevado cerca de 14 pontos.
- Cada tab mantém área interativa mínima de 48 × 48.

### Composição

```text
[ Today ] [ Plan ] [   Start   ] [ Progress ] [ You ]
```

- Tab ativa mostra ícone, label e indicador curto.
- Tab inativa mostra ícone; accessibility label permanece completa.
- Botão Start usa brand fill, brandInk e glow controlado.
- Quando existe treino ativo, o botão mostra progress ring e um ícone de atividade.
- A dock não usa blur ou glass como única separação do conteúdo.

### Motion

- Press: scale breve e retorno por spring.
- Mudança de tab: indicador desliza; labels entram sem deslocar toda a dock.
- Start → active: anel surge e ícone transforma sem rotação excessiva.
- Reduce motion troca morph/slide por mudança imediata de cor e estado.

## App bar

- Today usa wordmark à esquerda e avatar/ação à direita.
- Demais tabs usam título da seção e a mesma linha de ações.
- Rotas de stack usam back button, título curto e ações contextuais.
- Header não é uma caixa pesada; ele deve parecer parte da composição da tela.

## Primitives da v0.1

### Button

- Variantes: primary, secondary, ghost e danger.
- Tamanhos: medium e large.
- Estados: default, pressed, disabled e loading.
- Primary usa brand; somente uma ação primary dominante por região.

### TextField

- Label persistente acima do campo.
- Placeholder não substitui label.
- Focus usa border brand e halo discreto.
- Erro usa texto e ícone, nunca somente cor.
- Campo de senha permite alternar visibilidade.

### Card

- Variantes: default, elevated e interactive.
- Interactive possui press feedback e accessibility role.
- Cards aninhados devem ser evitados.

### Chip

- Variantes: neutral, selected, info e warning.
- Área inteira é clicável.
- Estado selecionado possui cor e marca visual adicional.

### Sheet

- Aparece a partir da borda inferior.
- Backdrop fecha apenas quando a ação não for destrutiva.
- Ações destrutivas pedem confirmação explícita.
- Respeita teclado e safe area.

## Motion

| Papel                    | Duração inicial |
| ------------------------ | --------------- |
| Feedback direto          | 160–220 ms      |
| Entrada de conteúdo      | 240–320 ms      |
| Reorganização estrutural | 320–480 ms      |

- Usar springs em objetos manipuláveis e dock.
- Não animar todo card ao mesmo tempo em listas longas.
- Gráficos desenham apenas na primeira entrada ou mudança relevante.
- Nada essencial depende de assistir à animação.

## Haptics

- Selection: troca de tab, tema e chip.
- Light impact: scrub e press secundário.
- Medium impact: iniciar/pausar sessão.
- Success notification: concluir workout.
- Warning notification: confirmação destrutiva.
- O app deve continuar compreensível quando haptics não estiver disponível.

## Conteúdo

- UI em inglês com frases curtas.
- Tom confiante, objetivo e sem culpa.
- Diferenciar `Demo data`, `Estimate` e `Suggestion` quando necessário.
- Não usar linguagem médica ou promessas de segurança.
- Não exibir `AI-powered`; usar `Smart Adaptation · Simulated`.

Exemplos:

- `Ready when you are.`
- `Today · Upper Strength`
- `Offline demo — no real account is created.`
- `Keep the goal. Reduce the time.`
- `Smart Adaptation · Simulated`

## Acessibilidade

- Contraste mínimo WCAG AA para texto funcional.
- Não comunicar estado somente por cor.
- Font scaling não pode ocultar logout, reset ou controle de workout.
- Ícones isolados têm accessibility label e hint quando necessário.
- Ordem de foco segue ordem visual.
- Reduce motion deve ser testado no dispositivo.
- Mapa corporal futuro terá uma lista textual equivalente.

## O que evitar

- neon em todas as superfícies;
- gradientes sobre texto;
- glass sem fallback;
- números enormes sem contexto;
- fotografia como background de formulário;
- sombras pretas pesadas em dark mode;
- animações de loading que fingem request remoto;
- componentes que mudam completamente entre light e dark;
- bottom navigation padrão com apenas uma troca de cor.
