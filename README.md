# 🗺️ FuelMap Manaus

Para entender onde cada parte do codigo fica, veja [docs/project-structure.md](docs/project-structure.md).

Bem-vindo ao repositório do FuelMap Manaus. Este projeto utiliza o ecossistema robusto do **Expo** com backend incluso sendo executado concorrentemente.

Para que tudo funcione de modo universal e fluido, siga este guia definitivo ao baixar o código em qualquer PC.

---

## 🛠️ 1. Pré-Requisitos no Computador

Para iniciar o projeto corretamente, o sistema precisa atender às versões exatas em que o projeto ganha estabilidade.

1. **Instalar Node.js v22 (LTS):** 
   - Baixe nativamente o `v22.x` pelo [site oficial](https://nodejs.org) ou instale com o [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm): `nvm install 22` e `nvm use 22`.
   - **Nota Importante:** Versões antigas (como v18) não são mais suportadas e exibirão erros fatais de módulo (ESM) ao iniciar o Expo.
2. **Gerenciador de Pacotes PNPM:**
   - Este projeto usa a estabilidade da árvore de dependências do pnpm.
   - Ative via Corepack (nativo no Node.js):
   ```bash
   corepack enable
   ```

---

## 🚀 2. Como Instalar

Abra o terminal dentro da pasta do projeto recém-clonado e obedeça a este simples passo:

1. Renomeie (ou copie) o arquivo `.env.example` para `.env` e preencha as chaves lá dentro, caso não possuam os defaults configurados. 
2. Construa a estrutura de pacotes:

```bash
pnpm install
```

---

## 📱🖥️ 3. Como Rodar no Dia-A-Dia

Sempre que for mexer no código, você só precisa digitar de forma simples e direta no terminal:

```bash
pnpm run dev
```
*(Este comando levanta de forma simultânea o Servidor Backend (API) e o Expo Metro Bundler para a Interface do Aplicativo).*

### 👀 Pré-Visualizando as Telas (Como Testar)

Ao constar no terminal que o código subiu sem erros, você tem dois caminhos:

#### A. Testar Diretamente pelo Celular (Físico)
1. Instale o aplicativo **Expo Go** disponível de graça na [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779).
2. Execute pnpm run expo:start
3. Abra seu app de "Câmera" ou o próprio "Expo Go", e aponte para o **QR Code gigante** que o próprio terminal do seu computador (Powershell/CMD) desenhou.
4. Se estiverem na mesma rede de Wi-Fi, a mágica acontece.

#### B. Testar Diretamente pelo Computador (Web)
1. Sem precisar sair do mesmo terminal, basta apertar a tecla **`w`**.
2. O Expo gerará dinamicamente as páginas renderizadas pra formato de site em seu navegador padrão (`http://localhost:8081`).

#### Dicas Extras do Terminal Expo
Pressionando a respectiva tecla no seu terminal quando rodar pnpm run dev, reações extras acontecem:
- `i` - Procura e inicializa automático pelo Emulador do iOS (precisa XCode de Mac/VM).
- `a` - Procura e inicializa automático no Emulador Android via Android Studio.
- `r` - Força os aplicativos que estiverem ativos fazendo uso da porta a recarregarem.
- `j` - Abre as ferramentas de Debug (Inspecionar estilos e network).

---

> Ambiente moldado profissionalmente, independente de PC ou Sistema Operacional, seu código é blindado para iniciar estavelmente e não requerer "gambiarras".
