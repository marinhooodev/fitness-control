# CONTROL — asset brief

> Estratégia aprovada: imagens hero originais geradas + banco gratuito para apoio  
> Nenhuma imagem é requisito para iniciar a v0.1.0.

## Objetivo

Criar uma biblioteca visual pequena, coerente e legalmente rastreável sem custo. CONTROL não precisa de dezenas de fotos: as imagens devem entrar apenas quando aumentarem narrativa, energia ou contexto.

Logo, ícones, gráficos, body map e fundos serão vetoriais ou procedurais. Fotografias nunca substituem uma interface bem composta.

## Regras

- Não usar imagem remota em runtime.
- Não usar imagem com marca, texto, interface, watermark ou equipamento com logo destacado.
- Não usar imagens médicas, transformação corporal “antes/depois” ou estética punitiva.
- Manter diversidade de gênero, corpo e tom de pele sem transformar pessoas em decoração genérica.
- Evitar anatomia ou mãos deformadas em imagens geradas.
- Otimizar antes de incluir no app.
- Registrar a origem de todo arquivo.

## Estrutura futura

```text
assets/
  brand/
  generated/
    hero/
  stock/
    editorial/
  vectors/
  fonts/
```

Não criar pastas vazias durante a etapa documental.

## Pack gerado no ChatGPT

### Processo

1. Gerar a imagem 01.
2. Escolher uma variação com rosto, roupa, iluminação e textura adequados.
3. Anexar essa imagem como referência nas gerações 02–04 quando houver a mesma pessoa.
4. Pedir explicitamente consistência de identidade e figurino.
5. Exportar o arquivo original, sem adicionar texto.
6. Enviar os originais para inclusão e otimização no repositório.

### Linguagem comum

- editorial esportivo premium;
- luz de estúdio dramática, porém natural;
- preto carvão, cinza mineral e pequeno acento verde-lima;
- contraste controlado e pele realista;
- grão fotográfico sutil;
- espaço negativo pensado para UI;
- energia concentrada, sem expressão agressiva artificial;
- enquadramento vertical 4:5;
- sem texto e sem logos.

### Prompt 01 — identidade principal

```text
Create a premium athletic editorial photograph for a modern fitness mobile app called CONTROL. A focused hybrid athlete in a dark charcoal training studio, standing at rest immediately before a workout, natural confident expression, realistic skin texture, black technical training clothes with one very subtle acid-lime detail, sculptural side lighting, deep graphite background, soft atmospheric haze, restrained cinematic contrast, high-end sports campaign art direction, clean negative space in the upper-left and lower area for mobile UI, vertical 4:5 composition. No text, no logo, no watermark, no visible brand marks, no neon cyberpunk aesthetic, no exaggerated muscles, anatomically correct hands and body.
```

Uso previsto: onboarding final, sessão recomendada ou material de portfólio.

### Prompt 02 — força

Anexar a imagem 01 como referência quando possível.

```text
Using the attached athlete as the exact identity and styling reference, create a second image in the same CONTROL sports editorial campaign. The athlete performs a controlled strength movement with a neutral unbranded barbell in a charcoal studio, technically credible posture, captured between effort and control rather than at maximal strain, realistic anatomy and equipment, black technical outfit with the same subtle acid-lime detail, sculptural side lighting, graphite palette, subtle film grain, negative space on the right for workout metrics, vertical 4:5. No text, no logo, no watermark, no neon lighting, no distorted plates, hands, joints, or equipment.
```

Uso previsto: workout preview e força no Today.

### Prompt 03 — condicionamento

```text
Create a premium athletic editorial photograph for the CONTROL fitness app campaign. A hybrid athlete in motion during an indoor conditioning session, dynamic but technically credible stride, dark minimal training environment, controlled motion blur only around the background and limbs, crisp face and torso, black performance clothing with a subtle acid-lime accent, directional cool daylight mixed with soft studio light, graphite and mineral palette, realistic anatomy, generous negative space above and to the left for mobile interface content, vertical 4:5. No text, no logos, no watermark, no cyberpunk neon, no exaggerated sweat or facial expression.
```

Uso previsto: conditioning card e futuros cenários híbridos.

### Prompt 04 — recuperação

```text
Create a calm premium sports editorial photograph for the CONTROL fitness app. An athlete in a quiet recovery moment after training, seated or stretching naturally in a minimal charcoal studio with soft early-morning light, grounded breathing and relaxed focus, realistic skin and anatomy, matte black training clothes, a restrained pale cyan accent in the environment, gentle shadows, subtle photographic grain, high-end wellness campaign quality without looking medical, clean negative space for readiness data, vertical 4:5. No text, no logo, no watermark, no yoga cliché, no glowing body effects, no distorted hands or joints.
```

Uso previsto: recovery, rest day e readiness.

## Banco gratuito

Fontes aprovadas:

- [Unsplash](https://unsplash.com/license)
- [Pexels](https://www.pexels.com/license/)

Uso planejado: no máximo seis imagens secundárias para equipamento, ambientes ou variação editorial que não justifique uma geração original.

Critérios:

- enquadramento compatível com crop vertical;
- luz e paleta próximas ao pack gerado;
- nenhuma marca destacada;
- sem pose artificial de catálogo;
- resolução suficiente para 2× sem incluir arquivos gigantes;
- licença conferida no momento do download.

## Registro de proveniência

Preencher esta tabela quando um asset for aceito:

| Arquivo local | Tipo | Autor/gerador | Origem ou prompt | Licença | Data | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — |

Para imagens geradas, `Origem ou prompt` pode apontar para a seção deste documento e `Licença` deve registrar `Generated by project owner with ChatGPT`.

## Preparação técnica

- Preservar os originais fora do bundle quando forem muito grandes.
- Criar derivados locais em WebP ou JPEG conforme transparência e compatibilidade.
- Dimensão longa padrão: até 1600 px para hero mobile, salvo necessidade comprovada.
- Preferir qualidade visual entre 80 e 88 em JPEG/WebP e inspecionar artefatos.
- Manter crop safe para 4:5, 9:16 e cards horizontais quando a imagem tiver múltiplos usos.
- Usar `expo-image` com import/require local.
- Definir dimensões ou aspect ratio para evitar layout shift.

## Assets vetoriais

### v0.1

- símbolo CONTROL;
- wordmark;
- splash;
- app icon e Android adaptive icon;
- ícones da dock.

### Versões posteriores

- progress rings;
- charts e sparklines;
- body map frontal e traseiro;
- ícones de grupos musculares;
- share card.

O body map não deve ser extraído de uma ilustração anatômica sem licença. Criar um desenho abstrato próprio, com lista textual equivalente para acessibilidade.

## Critério de aceite

Um asset entra no app somente quando:

- tem função definida;
- combina com os dois temas ou possui tratamento específico documentado;
- não prejudica contraste;
- possui proveniência registrada;
- está otimizado;
- não contém texto ou marca acidental;
- não exige internet para aparecer;
- parece pertencer à mesma campanha visual dos demais assets.
