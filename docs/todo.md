# FuelMap Manaus — TODO

## Setup & Infraestrutura
- [x] Configurar tema de cores verde-amazônico no theme.config.js
- [x] Criar dados mock realistas de postos de Manaus
- [x] Configurar estrutura de navegação com 5 abas
- [x] Mapear ícones necessários em icon-symbol.tsx
- [x] Gerar logo do app e configurar app.config.ts
- [x] Instalar dependências: react-native-maps, react-native-svg

## Tela de Mapa (Tab 1)
- [x] Mapa base centrado em Manaus com react-native-maps
- [x] Pins coloridos por faixa de preço (verde/amarelo/vermelho)
- [x] Filtro rápido por tipo de combustível (chips no topo)
- [x] Bottom sheet ao tocar em pin com resumo do posto
- [x] Botão "Minha localização"
- [x] Indicador de preço desatualizado (>48h)

## Tela de Listagem (Tab 2)
- [x] FlatList de postos com StationCard
- [x] Ordenação: mais barato, mais próximo, melhor avaliado
- [x] Filtros por tipo de combustível e raio de distância
- [x] Badge de última atualização e score de confiança

## Tela de Detalhes do Posto (Modal/Stack)
- [x] Header com nome, bandeira, endereço, distância
- [x] Tabela de preços por tipo de combustível
- [x] Gráfico de histórico de preços (30 dias) com SVG
- [x] Score de confiança e última atualização
- [x] Avaliações: atendimento, segurança, conveniência
- [x] Botão "Reportar Preço" e "Favoritar"
- [x] Botão "Como chegar"

## Reporte Colaborativo de Preços (Modal)
- [x] Seleção do tipo de combustível
- [x] Input de preço por litro
- [x] Confirmação com haptic feedback
- [x] Atualização do score de confiança

## Comparador de Postos (Tab 3)
- [x] Seleção de 2 postos para comparar
- [x] Tabela comparativa: preço, distância, avaliação
- [x] Cálculo de economia para tanque cheio
- [x] Input de capacidade do tanque personalizável

## Favoritos (Tab 4)
- [x] Lista de postos salvos
- [x] Indicador de variação de preço (↑ ↓)
- [x] Persistência com AsyncStorage

## Perfil e Alertas (Tab 5)
- [x] Tela de Perfil com contador de contribuições
- [x] Lista de alertas ativos
- [x] Criar alerta: combustível, valor máximo, posto específico ou qualquer
- [x] Toggle ativar/desativar alerta
- [x] Configurações: tema claro/escuro

## Polimento
- [x] Animações sutis de transição
- [x] Estados de loading e empty state
- [x] Feedback visual e haptico nas ações principais


## Login Social (Nova Feature)
- [x] Ler documentação do servidor e schema do banco
- [x] Criar tabelas userProfiles e contributions no PostgreSQL
- [x] Implementar endpoints OAuth no servidor (Google e Facebook)
- [x] Criar tela de login com botões Google e Facebook
- [x] Integrar AppContext com estado de usuário autenticado
- [x] Implementar persistência de sessão no AppContext
- [x] Criar contexto de usuário autenticado
- [x] Adicionar tela de login ao Stack de navegação
- [x] Redirecionar para mapa após autenticação
