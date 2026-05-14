# Estrutura do projeto

Este projeto usa Expo Router no app mobile/web e um servidor local em Node/Express.

## Pastas principais

- `app/`: rotas e telas do Expo Router. Os nomes de arquivos aqui fazem parte das URLs/rotas, entao devem ser alterados com cuidado.
- `components/`: componentes visuais reutilizaveis, separados por finalidade.
- `hooks/`: hooks React separados por dominio.
- `constants/`: constantes usadas no app, como tema e OAuth.
- `context/`: providers globais da aplicacao.
- `data/`: dados locais usados pelo app.
- `lib/`: clientes, provedores e utilitarios compartilhados pelo frontend.
- `server/`: backend local, rotas tRPC, storage e integracoes.
- `shared/`: tipos e constantes compartilhados entre frontend e backend.
- `drizzle/`: schema e migrations do banco.
- `tests/`: testes automatizados.
- `assets/`: imagens e recursos estaticos.
- `scripts/`: scripts auxiliares do projeto.
- `docs/`: documentacao, design e notas de planejamento.

## Componentes

- `components/common/`: componentes genericos de interface.
- `components/fuel/`: componentes ligados a postos, combustiveis e precos.
- `components/gamification/`: componentes de reputacao, badges e progresso.
- `components/layout/`: wrappers e estruturas de tela.
- `components/map/`: implementacoes do mapa por plataforma.
- `components/navigation/`: componentes de navegacao.
- `components/ui/`: primitivas pequenas de UI.

## Hooks

- `hooks/auth/`: autenticacao.
- `hooks/fuel/`: regras e calculos de combustivel/preco.
- `hooks/location/`: localizacao e geofence.
- `hooks/theme/`: tema, cores e esquema claro/escuro.

## Observacoes de manutencao

- Mantenha `app/` no padrao do Expo Router.
- Mantenha `drizzle/schema.ts` e `drizzle/migrations/` nos caminhos configurados em `drizzle.config.ts`.
- Prefira imports com alias `@/` para evitar caminhos relativos longos.
