# Abastece Manaus - Design System

## Direcao

O app deve parecer profissional, funcional e facil de escanear. A interface prioriza comparacao rapida de precos, confianca nas informacoes e acoes diretas no mapa/lista.

## Identidade

- Verde: economia, confirmacao, Manaus/Amazonia e confianca.
- Ambar: combustivel, destaque e alertas nao criticos.
- Vermelho: erro, preco caro e situacoes de risco.
- Superficies neutras: leitura rapida e menos competicao com o mapa.

## Cores

- `primary`: verde principal para acoes, tabs ativas e estados positivos.
- `secondary`: ambar para destaque e acoes secundarias.
- `accent`: ambar escuro para detalhes de combustivel.
- `background`: fundo geral do app.
- `surface` / `card`: cards, paineis e sheets.
- `foreground`: texto principal.
- `muted`: texto secundario.
- `border`: separadores e contornos.
- `success`, `warning`, `error`: estados semanticos.

## Cores de preco

- `priceCheap`: preco barato.
- `priceMedium`: preco medio.
- `priceExpensive`: preco caro.

Essas cores devem ser consistentes em pins, badges, cards e comparadores.

## Cores de combustivel

- `fuelGasoline`
- `fuelEthanol`
- `fuelDiesel`
- `fuelGnv`

Use estas cores para filtros, graficos e legendas quando a informacao principal for o tipo de combustivel.

## Radius

O app usa cantos moderados para manter sensacao utilitaria:

- `xs`: 6
- `sm`: 8
- `md`: 12
- `lg`: 16
- `xl`: 20
- `full`: 9999

Cards comuns devem preferir `md`. Modais e sheets podem usar `lg` ou `xl`.

## Espacamento

Use a escala `space`:

- `1`: 4
- `2`: 8
- `3`: 12
- `4`: 16
- `5`: 20
- `6`: 24
- `8`: 32
- `10`: 40

Evite valores soltos quando houver token equivalente.

## Tipografia

Use a escala `font`:

- `xs`: metadados e captions.
- `sm`: labels e textos auxiliares.
- `md`: texto padrao.
- `lg`: titulos compactos.
- `xl`/`xxl`: titulos de tela.

Nao escale fonte com viewport. Mantenha line-height explicito.

## Componentes Base

Novas primitivas em `components/ui`:

- `AppText`: texto com variantes `body`, `label`, `muted`, `title`, `caption`.
- `AppCard`: superficie padronizada com borda, radius e sombra leve.
- `AppButton`: botoes `primary`, `secondary` e `ghost`.
- `AppChip`: filtros e seletores compactos.

Telas novas devem preferir esses componentes antes de criar estilos locais.

## Uso

- Use tokens para cor, radius, sombra, tipografia e espacamento.
- Mantenha hardcoded hex apenas para marcas externas, como Google/Facebook/Shell.
- Use vermelho somente para erro ou preco caro.
- Priorize densidade organizada: cards compactos, textos claros e acoes previsiveis.
- Evite gradientes fortes e efeitos decorativos que atrapalhem comparacao.
