# CONTROL — qualidade e fechamento

> Quality gates planejados para v0.1.0

## Princípio

O objetivo do projeto é visual, mas “parece bonito no meu aparelho” não é definição de pronto. Cada versão deve provar que navegação, persistência, estados, acessibilidade e plataformas principais continuam coerentes.

## Baseline atual

- A Sessão 1 removeu o código visual do starter e suas dependências de CSS modules.
- A Sessão 2 adicionou tema persistido, fontes locais e primitives; a Sessão 3 substituiu a vitrine pelos fluxos locais de auth e onboarding.
- Os scripts `lint`, `typecheck`, `test` e `test:ci` estão configurados.
- TypeScript continua em strict mode; os erros de CSS foram eliminados na origem, sem `skipLibCheck` ou tipos amplos.
- Quatorze testes cobrem estados de botão, erro/visibilidade de senha, Sheet, validação de auth, onboarding, reidratação, os dois caminhos de entrada, e-mail desconhecido, ausência de senha e diferença entre logout/reset.
- Os exports Android e iOS passam após a Sessão 3; o export geral e o smoke Web permanecem gates do fechamento da versão.
- Android e iPhone físico ainda precisam da validação manual de fonte ampliada, reduce motion e interações indicada neste documento.

## Scripts-alvo

```json
{
  "scripts": {
    "lint": "expo lint",
    "typecheck": "tsc --noEmit",
    "test": "jest --watch",
    "test:ci": "jest --runInBand"
  }
}
```

O formato final pode incluir flags adicionais necessárias ao Expo 57, mas os nomes dos comandos devem permanecer.

## Gates automatizados

Executar separadamente:

```bash
npm run lint
npm run typecheck
npm run test:ci
```

No fechamento da versão, executar também um export de bundle compatível com o projeto para detectar assets ou imports ausentes. O resultado gerado deve permanecer ignorado pelo git.

## Cobertura comportamental da v0.1

### Hidratação e roteamento

- Sem sessão: abre sign-in somente depois da hidratação.
- Sessão válida: abre Today sem piscar sign-in.
- Perfil sem onboarding: abre onboarding.
- Rota autenticada não fica acessível após logout.

### Auth local

- Continue with demo profile entra com dados seed.
- Sign-up bloqueia nome vazio, e-mail inválido, senha curta e confirmação divergente.
- Sign-up persiste perfil e nunca persiste senha.
- Sign-in aceita o e-mail local e rejeita e-mail desconhecido.
- Logout preserva perfil e preferências.
- Reset demo data remove perfil, sessão, workout e override de tema.

### Tema

- System responde ao color scheme.
- Light e dark sobrescrevem o sistema.
- Escolha manual sobrevive a reload.
- Status bar e navigator usam o tema resolvido.

### Navegação

- Today, Plan, Progress e You ficam acessíveis pela dock.
- Tab ativa possui estado visual e accessibility state.
- Back do Android não cria loops entre tabs.
- Botão central abre preview sem sessão ativa.
- Botão central retorna ao workout quando existe sessão ativa.
- Workout ativo esconde a dock.

### Sessão mínima

- Start registra timestamp e status active.
- Pause registra pausa sem perder início.
- Resume acumula tempo pausado.
- Finish conclui e limpa o estado ativo.
- Reload durante active ou paused restaura estado coerente.

### Primitives

- Button primary/disabled/loading.
- TextField normal/focus/error/password visibility.
- Sheet abre, recebe foco, respeita back e fecha conforme regra.
- Componentes essenciais renderizam em light e dark.

## Matriz manual

### Dispositivos principais

| Plataforma | Alvo                                    | Obrigatório no fechamento |
| ---------- | --------------------------------------- | ------------------------- |
| Android    | aparelho físico ou emulador via Expo Go | Sim                       |
| iOS        | iPhone físico via Expo Go               | Sim                       |
| Web        | navegador desktop                       | Smoke de build/render     |

### Tamanhos de referência

- Android compacto próximo de 360 × 800.
- Android padrão próximo de 412 × 915.
- iPhone padrão próximo de 390 × 844.
- iPhone com safe area/dynamic island equivalente.

Não é necessário possuir exatamente esses modelos; usar dimensões próximas para inspeção.

### Cenários visuais

Em Android e iPhone:

- first launch;
- demo login;
- cadastro com erro e sucesso;
- onboarding em todos os passos;
- Today em light e dark;
- todas as tabs;
- workout preview;
- workout active, paused e concluído;
- You com theme selector;
- logout;
- reset;
- fonte do sistema ampliada;
- reduce motion;
- teclado aberto em campos de auth.

## Acessibilidade

- Alvos de toque importantes: mínimo de 44 × 44 pontos.
- Accessibility labels para ícones sem texto.
- Accessibility state para tabs, toggles e seleção.
- Erro de formulário comunicado por texto e associado ao campo.
- Contraste WCAG AA para texto funcional.
- Fluxos essenciais operáveis com reduce motion.
- Font scaling não pode esconder ações ou cortar labels críticas.
- Haptic nunca é o único feedback.

## Offline e privacidade

- Testar o fluxo após o bundle estar carregado com conectividade desativada.
- Não deve existir `fetch`, WebSocket, analytics ou URL remota de asset no código de produto.
- Inspecionar o estado persistido para confirmar ausência de senha.
- UI de auth precisa continuar exibindo que é uma demo local.

## Performance visual

- Evitar animações JS por frame quando Reanimated resolver na UI thread.
- Listas curtas da v0.1 não precisam de virtualização adicional.
- Não incluir imagens originais gigantes no bundle.
- Evitar múltiplos blurs ou sombras grandes sobrepostas.
- Splash não adiciona atraso artificial depois de fontes e store prontos.

## Checklist por sessão

Toda sessão de implementação termina com:

- app iniciando;
- mudanças principais navegáveis;
- nenhum erro TypeScript novo conhecido;
- nenhuma ação primária morta;
- git diff revisado;
- comentário no plano somente se a realidade alterar a decisão.

## Checklist de fechamento da v0.1.0

- [ ] Produto aparece como CONTROL.
- [ ] Versão está em 0.1.0.
- [ ] Starter visual foi removido.
- [ ] Login, cadastro, onboarding e logout funcionam localmente.
- [ ] Senha não é persistida.
- [ ] System/light/dark funcionam e persistem.
- [ ] Quatro tabs e botão central funcionam.
- [ ] Sessão mínima inicia, pausa, retoma e termina.
- [ ] Reset demo data restaura first launch.
- [ ] Lint passa.
- [ ] Typecheck passa.
- [ ] Testes passam.
- [ ] Export passa.
- [ ] Smoke Android passa.
- [ ] Smoke iPhone passa.
- [ ] Smoke web passa.
- [ ] README corresponde ao app entregue.
- [ ] Assets adicionados possuem proveniência.
- [ ] Nenhuma rede, backend ou IA real foi introduzida.

Não criar tag, release, publicação ou commit automaticamente ao completar a lista.
