# FuelMap Manaus — Design Document

## Brand Identity

**Conceito visual:** App utilitário com identidade verde-amazônica. Tons de verde e âmbar remetem à floresta e ao combustível. Interface limpa, direta e funcional — estilo iOS nativo.

**Paleta de cores:**
- Primary: `#16A34A` (verde floresta)
- Background: `#FFFFFF` / dark: `#0F1A0F`
- Surface: `#F0FDF4` / dark: `#1A2E1A`
- Foreground: `#14532D` / dark: `#DCFCE7`
- Muted: `#6B7280` / dark: `#9CA3AF`
- Border: `#D1FAE5` / dark: `#166534`
- Success: `#22C55E` (preço barato)
- Warning: `#F59E0B` (preço médio)
- Error: `#EF4444` (preço caro)
- Accent: `#F97316` (laranja combustível)

---

## Screen List

1. **MapScreen** — Tela principal com mapa de Manaus e pins coloridos
2. **ListScreen** — Listagem de postos com filtros e ordenação
3. **StationDetailScreen** — Detalhes do posto, preços, avaliações, histórico
4. **ReportPriceScreen** — Modal para reportar preço na bomba
5. **ComparatorScreen** — Comparar 2+ postos lado a lado
6. **FavoritesScreen** — Postos salvos pelo usuário
7. **AlertsScreen** — Configurar alertas de preço máximo
8. **ProfileScreen** — Perfil do usuário, contribuições, configurações

---

## Primary Content & Functionality

### MapScreen (Tab 1 — Mapa)
- Mapa base com react-native-maps (OpenStreetMap/Google Maps)
- Pins coloridos: 🟢 verde (barato), 🟡 amarelo (médio), 🔴 vermelho (caro)
- Filtro rápido por tipo de combustível no topo (chips: Gasolina, Etanol, Diesel, GNV)
- Bottom sheet com resumo do posto ao tocar no pin
- Botão "Minha localização" para centralizar mapa
- Indicador de postos com preço desatualizado (>48h)

### ListScreen (Tab 2 — Postos)
- FlatList de postos com card compacto
- Ordenação: Mais barato, Mais próximo, Melhor avaliado
- Filtros: tipo de combustível, raio de distância
- Badge de "Atualizado há X horas" em cada card
- Score de confiança visual (ícone de pessoas confirmando)

### StationDetailScreen (Modal/Stack)
- Header com nome, bandeira, endereço e distância
- Tabela de preços por tipo de combustível
- Gráfico de histórico de preços (30 dias)
- Score de confiança e última atualização
- Avaliações: atendimento, segurança, conveniência (estrelas)
- Botão "Reportar Preço" e "Favoritar"
- Botão "Como chegar" (abre Maps nativo)

### ReportPriceScreen (Modal)
- Seleção do tipo de combustível
- Input de preço por litro
- Confirmação com haptic feedback
- Mensagem de agradecimento pela contribuição

### ComparatorScreen (Tab 3 — Comparar)
- Seleção de 2 postos (busca ou recentes)
- Tabela comparativa: preço por litro, distância, avaliação
- Cálculo de economia para tanque cheio (ex: 50L)
- Input de capacidade do tanque personalizável

### FavoritesScreen (Tab 4 — Favoritos)
- Lista de postos salvos
- Indicador de variação de preço desde a última visita (↑ ↓)
- Acesso rápido ao detalhe

### AlertsScreen (dentro de Perfil)
- Lista de alertas ativos
- Criar alerta: selecionar posto ou "qualquer posto", tipo de combustível, valor máximo
- Toggle para ativar/desativar

### ProfileScreen (Tab 5 — Perfil)
- Avatar e nome do usuário
- Contador de contribuições (preços reportados)
- Configurações: tema (claro/escuro), unidade de distância
- Acesso a Alertas

---

## Key User Flows

### Fluxo 1 — Encontrar posto barato
1. Abre o app → MapScreen com localização atual
2. Vê pins coloridos → toca no pin verde (mais barato)
3. Bottom sheet aparece com resumo do posto
4. Toca em "Ver detalhes" → StationDetailScreen
5. Toca em "Como chegar" → abre Maps

### Fluxo 2 — Reportar preço
1. Na StationDetailScreen → toca "Reportar Preço"
2. ReportPriceScreen abre como modal
3. Seleciona combustível → digita preço → confirma
4. Preço atualizado com score de confiança +1

### Fluxo 3 — Comparar postos
1. Tab Comparar → seleciona 2 postos
2. Vê tabela comparativa com economia calculada
3. Toca em "Ver no mapa" para visualizar rota

### Fluxo 4 — Criar alerta de preço
1. Tab Perfil → Alertas → "Novo Alerta"
2. Seleciona tipo de combustível e valor máximo
3. Recebe notificação quando preço baixar

---

## Navigation Structure

```
TabBar (bottom)
├── Tab 1: Mapa (house.fill / map)
├── Tab 2: Postos (list.bullet / format-list-bulleted)
├── Tab 3: Comparar (arrow.left.arrow.right / compare-arrows)
├── Tab 4: Favoritos (heart.fill / favorite)
└── Tab 5: Perfil (person.fill / person)

Stack (modal)
├── StationDetailScreen
├── ReportPriceScreen
└── AlertDetailScreen
```

---

## Component Design Patterns

- **StationCard**: card com nome, endereço, preço destaque, distância, badge de atualização
- **PricePin**: marcador de mapa colorido com preço em texto
- **FuelTypeChip**: chip selecionável para filtro de combustível
- **PriceHistoryChart**: gráfico de linha simples com react-native-svg
- **ConfidenceScore**: ícone de pessoas + número de confirmações
- **PriceBadge**: badge colorido verde/amarelo/vermelho por faixa de preço
