# stack-client-js

This template should help get you started developing with Vue 3 in Vite.

## Initialize Local Development

clone project

```sh
git clone ssh://git@gitlab.sintezis.co:8022/sintezis/stacks/js/stack-client-js.git
```

cd into project

```sh
cd stack-client-js
```

(optional) create local env file

```sh
cp .env.development .env.development.local
```

generate proto files (and update Makefile with proto definitions as needed)

```sh
make proto
```

install dependencies

```sh
npm install
```

run local development server

```sh
npm run dev
```

## Recommended IDE Setup

- install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
- install [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- disable `TypeScript and JavaScript Language Features`
  - go to extensions
  - search for: **@builtin TypeScript and JavaScript Language Features**
  - disable
  - reload window: `cmd + shift + p` > `Developer: Reload Window`

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Production Deployment

Type-Check, Compile and Minify for Production

```sh
npm run build
```
