# CONTROL — visão de produto

> Status: direção aprovada  
> Documento de produto; não representa implementação concluída  
> Atualizado em: 15 de setembro de 2026

## Resumo

CONTROL será um aplicativo-conceito de portfólio para treinos híbridos. A experiência combina planejamento, execução e progresso em uma interface de alto impacto visual, inteiramente construída com dados locais e simulados.

O produto não será publicado como serviço real e nunca receberá backend, banco, autenticação real ou integração com IA. Seu objetivo é demonstrar design de produto, React Native, motion, gestos, estado local, visualização de dados, acessibilidade e acabamento cross-platform.

Promessa central:

> **Your body changes every day. Your plan should too.**

## Público

O perfil demonstrativo representa uma pessoa iniciante avançada ou intermediária que:

- treina de três a cinco vezes por semana;
- combina musculação e condicionamento;
- gosta de dados, mas não quer operar uma planilha durante o treino;
- tem rotina, tempo e energia variáveis;
- quer compreender a relação entre consistência, carga e recuperação.

## Posicionamento

**CONTROL is an adaptive command center for hybrid training.**

O diferencial não será uma métrica inédita. Será uma experiência capaz de mostrar, com clareza e movimento:

1. o estado demonstrativo do usuário;
2. a sessão recomendada;
3. os fatores usados nessa recomendação;
4. como restrições locais alteram o plano;
5. como uma sessão concluída afeta as próximas telas.

## Princípios

### Visual extraordinário com função

Motion, gráficos, materiais e gestos devem comunicar hierarquia, mudança ou causalidade. Efeito decorativo nunca pode comprometer leitura ou operação durante o treino.

### Complexidade progressiva

A primeira leitura de uma tela precisa ser simples. Detalhes aparecem conforme o usuário abre cards, toca nos gráficos ou inicia uma tarefa.

### Funcional mesmo sendo simulado

Fluxos locais devem responder de ponta a ponta: criar perfil, concluir onboarding, trocar tema, iniciar treino, pausar, finalizar, adaptar e resetar dados. Mock não significa tela morta.

### Simulação honesta

Smart Adaptation será um conceito determinístico, offline e reproduzível. A interface e o case study não devem afirmar que existe um modelo de IA tomando decisões.

### Calma antes, energia durante

Planejamento e leitura de dados terão ritmo controlado. A sessão ativa ganhará contraste, respostas táteis e motion mais presente.

### Sem linguagem médica

Scores e sinais são demonstrativos. CONTROL não diagnostica, não trata, não promete prevenir lesão e não substitui acompanhamento profissional.

## Experiência principal

### Navegação

Quatro destinos persistentes e uma ação central:

| Destino | Papel |
| --- | --- |
| Today | Resumo, estado atual e treino recomendado |
| Plan | Semana de treino e adaptações simuladas |
| Progress | Tendências, consistência, recordes e Control Twin |
| You | Perfil local, equipamento, tema e reset |
| Start Workout | Botão central da dock; inicia ou retoma a sessão |

### Fluxo-herói futuro

1. A pessoa entra com o perfil demonstrativo ou cria um perfil local.
2. Today apresenta uma sessão recomendada e explica os fatores simulados.
3. A pessoa informa que tem pouco tempo ou equipamento limitado.
4. Smart Adaptation mostra uma comparação antes/depois e permite aplicar ou desfazer.
5. A sessão é iniciada pelo botão central da dock.
6. Séries, descanso e esforço são registrados localmente.
7. O recap atualiza os indicadores e o restante da semana.
8. Progress transforma a sessão em uma narrativa visual.

## Assinaturas do produto

### CONTROL Dock

Navegação inferior flutuante, desenhada especificamente para o produto. Seu botão central inicia o treino e se transforma em indicador de sessão ativa.

### Smart Adaptation

Sistema local de regras que demonstra cenários como pouco tempo, sono ruim, academia cheia e equipamento limitado. Não terá chat ou respostas generativas.

### Control Twin

Mapa corporal interativo em SVG, com camadas demonstrativas de recuperação, carga recente e estímulo planejado.

### Live Workout

Sessão operável com registro rápido, descanso, RPE/RIR, troca de exercício, pausa, haptics e recap.

## Identidade aprovada

- Nome público: **CONTROL**.
- Slug planejado: `control-fitness`.
- Interface: inglês.
- Documentação: português brasileiro.
- Personalidade: atlético-técnica, premium e precisa.
- Temas: light e dark completos.
- Cor de assinatura: Volt, um verde energético usado com moderação.
- Fotografia: mistura de imagens hero geradas e banco gratuito selecionado.
- Gráficos, ícones, logo e body map: vetoriais ou procedurais.

## Estado local e conta demonstrativa

O produto terá login, cadastro, onboarding e logout para demonstrar o fluxo completo da carcaça.

- Senhas nunca serão armazenadas.
- O cadastro cria apenas um perfil local de demonstração.
- O login valida o perfil local e a forma dos campos, não segurança real.
- Logout encerra a sessão e preserva perfil/progresso.
- Reset demo data apaga todo o estado local.
- Uma conta demonstrativa pronta permite entrar sem preenchimento manual.

## Fora de escopo permanentemente

- backend ou banco de dados;
- API ou cliente HTTP;
- autenticação, OAuth ou recuperação de senha reais;
- integração com LLM ou qualquer serviço de IA;
- camada preparatória para integrações futuras;
- dados reais de wearables ou saúde;
- pagamentos, assinatura ou anúncios;
- feed social, mensagens ou contas múltiplas reais;
- nutrição, cardápios e contagem de calorias;
- imagens remotas em runtime;
- publicação comercial.

## Roadmap do produto

| Versão | Resultado |
| --- | --- |
| v0.1.0 | Functional Shell: identidade, auth local, onboarding, temas, dock e sessão mínima |
| v0.2.0 | Today Command Center |
| v0.3.0 | Live Workout completo e recap |
| v0.4.0 | Plan e Smart Adaptation |
| v0.5.0 | Progress e Control Twin |
| v0.6.0 | Portfolio Release e case study |

Somente a v0.1.0 está detalhada para implementação. Cada versão posterior será refinada antes de seu código começar.

## Critério de sucesso

O projeto deve permitir que outra pessoa conclua, sem explicação externa, que o autor sabe:

1. transformar pesquisa em uma decisão de produto;
2. criar uma linguagem visual própria;
3. construir interações mobile sofisticadas;
4. manter arquitetura proporcional ao escopo;
5. trabalhar com dados locais complexos sem fingir infraestrutura inexistente;
6. tratar acessibilidade e estados alternativos como parte do design;
7. comunicar com honestidade onde existe simulação.

## Referências de mercado

- [ACSM — Top Fitness Trends for 2026](https://acsm.org/top-fitness-trends-2026/)
- [Strava — Year in Sport 2025](https://press.strava.com/en-gb/articles/strava-releases-12th-annual-year-in-sport-trend-report-2025)
- [Nike Training Club](https://www.nike.com/gb/ntc-app)
- [Hevy — Feature List](https://www.hevyapp.com/features/)
- [Fitbod — How Fitbod Works](https://help.fitbod.me/hc/en-us/sections/360001078993-How-Fitbod-Works)
- [WHOOP — AI Guidance](https://www.whoop.com/us/en/thelocker/new-ai-guidance-from-whoop/)
- [Oura — Readiness Score](https://support.ouraring.com/hc/en-us/articles/360025589793-An-Introduction-to-Your-Readiness-Score)
