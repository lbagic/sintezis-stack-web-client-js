# Sintezis Web Client

This template should help get you started developing with Vue 3 in Vite.

## Setup new project

```sh
git clone ssh://git@gitlab.sintezis.co:8022/sintezis/stacks/js/web.stack.js.git PROJECT_NAME
cd PROJECT_NAME
git remote rename origin upstream
git remote add origin PROJECT_URL
```

## Working with protos

Install dependencies:

```sh
brew install bufbuild/buf/buf
```

Generate proto files:

```sh
make proto
```

## Setup local development

Install required extensions:

- volar: https://marketplace.visualstudio.com/items?itemName=Vue.volar
- type support: https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin
- prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- eslint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Install dependencies:

```sh
npm install
```

Create .env file:

```sh
cp .env.example .env
```

Run development server:

```sh
npm run dev
```

## Compile and Minify for Production

```sh
npm run build
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
