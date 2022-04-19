![cypress](https://github.com/lne0nl/mapping-of-isaac-v2/actions/workflows/github-actions-init.yml/badge.svg?branch=master)

<div align="center">
    <img src="https://raw.githubusercontent.com/lne0nl/mapping-of-isaac/master/src/assets/logo-rm.png">
</div>

<p>
    <b><a href="https://lne0nl.github.io/mapping-of-isaac/">The Mapping of Isaac</a></b> is a simple website developped in Vue.js for the game <b>Binding of Isaac</b>.
    It allows you to place the rooms on the map of the floor you are playing, then calculate the probability for the secret rooms placements.
</p>
    
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)

```sh
npm run test:unit # or `npm run test:unit:ci` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
<div align="center">
    <img src="https://raw.githubusercontent.com/lne0nl/mapping-of-isaac/master/src/assets/isaac.png" width="100">
</div>

### TODO

- [ ] Add vizualisation of Super Secret rooms percent chances
- [ ] Implement Ultra Secrets room calculation
- [ ] Remove obstacles choice for room types that don't need it
