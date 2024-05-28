# to-dos-ui

Demonstrates a Test-Driven Development approach on how to develop a React web app using MobX and Cypress.  
It contains setup for development inside of VSCode Dev Containers (just Dev Containers from now on) or without it.

## Prerequisites

- [Docker](https://www.docker.com/get-started/) (needed for Dev Containers and TypeScript types generation)
- You need to run [API](https://github.com/TourmalineCore/to-dos-api) where UI makes network calls.

### If you develop inside Dev Containers
- [VSCode](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### If you develop using good old Node.js (no Dev Containers)

- [Node.js](https://nodejs.org/en) (version 20.11.1 was used but it should be also fine with some older versions, ideally install using `nvm` which will allow you to easily switch between Node.js versions if needed)
- [VSCode](https://code.visualstudio.com/) (optional, you can use any IDE but VSCode has configured formatting on save by the lint rules of the project)

## Start

If you open this project in VSCode please install Dev Containers extension and agree to re-open this project's folder in it with installing all the rest of recommended extensions.

```bash
# run once to install dependencies
npm ci

# to run the web site
npm start

# to run linting
npm run lint

# to run unit tests
npm run test

# to re-generate TypeScript types by locally running API
npm run generate-api-types
```

## TypeScript (VSCode only)

Even though it's configured from where VSCode should get the correct version of TypeScript you also need to run the **TypeScript: Select TypeScript Version** command and select the version from `node_modules` (https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions).

To run this command open any `.ts` or `.tsx` file, press `Ctrl + Shift + P` and past the command name **TypeScript: Select TypeScript Version**, press Enter, and click on the row where it could pick up the TypeScript version from `node_modules`.

If you don't do that you might see some weird IDE lint errors.

## Cypress (Dev Containers only)

If you want to work purely inside your Dev Container you have to connect the the Dev Container VNC server (remote desktop) here http://localhost:6080/. The password is `vscode`. Now you should be able to see Cypress GUI executing one of the available scripts from `package.json` e.g.

```bash
npm run cypress:open:component
```

## Docker Build

```bash
docker build -t to-dos-ui .
```

## Docker Local Run
```bash
docker run -t to-dos-ui --publish 5173:80 --env VITE_API_ROOT="http://localhost:5005/to-dos-api" --rm
```

## Helm Local
```bash
helmfile --namespace local -f ci/helmfile.yaml template
```

## React + TypeScript + Vite (as it was created by npm create vite@latest to-dos-ui -- --template react-ts)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

>Note: ESLint configuration was tuned and different from the template default setup

## Env (for future)

Useful refs on how to build docker image with this UI and make its env configurable at docker run:
- https://stackoverflow.com/a/78156859
- https://vitejs.dev/guide/env-and-mode
