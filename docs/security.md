# Segurança aplicada

Alteracoes feitas:

- Mocks de OAuth agora so ficam ativos em desenvolvimento.
- Login Google/Facebook real preparado em `/api/oauth/:provider/start` e `/api/oauth/:provider/callback`.
- Estado OAuth assinado com HMAC e expiracao de 10 minutos.
- Headers basicos de seguranca adicionados no Express.
- Rate limit simples em `/api/auth`, `/api/oauth` e `/api/trpc`.
- CORS de producao passou a usar `ALLOWED_ORIGINS`.
- `oauth.getOrCreateUser` deixou de ser publico.
- Contribuicoes de preco agora validam posto existente, faixa de preco e casas decimais.
- Login demo fica visivel apenas em desenvolvimento.
- Logs nao exibem mais trechos de token no app.

Variaveis novas:

- `ALLOWED_ORIGINS`: origens web permitidas em producao.
- `OAUTH_REDIRECT_BASE_URL`: URL publica da API usada nos callbacks OAuth.
- `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`.
- `FACEBOOK_CLIENT_ID` e `FACEBOOK_CLIENT_SECRET`.

Callbacks para configurar:

- Google: `/api/oauth/google/callback`
- Facebook: `/api/oauth/facebook/callback`

Pendencias recomendadas:

- Trocar `JWT_SECRET` por segredo forte em producao.
- Adicionar revogacao real de sessao.
- Validar contribuicao por proximidade GPS antes de aceitar preco.
- Guardar auditoria de reportes suspeitos.
