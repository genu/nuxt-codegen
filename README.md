# `nuxt-codegen`

> [GraphQL Code Generator](https://www.graphql-code-generator.com/) module for Nuxt3

## Quick setup
1. Add `nuxt-codegen` dependency to your project
```shell
# Using yarn
yarn add nuxt-codegen -D

# Using npm
npm install nuxt-codegen -D

# Using pnpm 
pnpm add nuxt-codegen -D
```

2. Add `nuxt-codegen` to the modules section of `nuxt.config.ts`

```shell
export default defineNuxtConfig({
    modules: ['nuxt-codegen']
})
```

Note you also need `graphql`, and the [plugins](https://www.graphql-code-generator.com/plugins) you want to use.


3. Create your `codegen.ts` [configuration file](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config) in the project's `rootDir` or use the [Initialization Wizard](https://www.graphql-code-generator.com/docs/getting-started/installation#initialization-wizard) 


The code generator will now be executed before each build or after any changes made to your graphql documents.

## Configuration
```ts
export default defineNuxtConfig({
  modules: ["nuxt-codegen", {
    /**
     * @default true
     * Only run codegen in development mode
     */

    devOnly: boolean;
    /**
     * @default ['.graphql', '.gql']
     * Which file extensions to watch for changes.
     */
    extensions: string[];

    /**
     * @default codegen.ts
     * Path to the config file (e.g. ./configs/codegen.config.ts)
     */
    configFile: string
  }],
});
```

## Prior art
- [@nuxt3/graphql-codegen-module
](https://github.com/newbeea/nuxt3-graphql-codegen-module)
- [nuxt-graphql-codegen](https://github.com/lewebsimple/nuxt-graphql-codegen)
## Development
1. Clone this repository
2. Install dependencies using pnpm `pnpm install`
3. Prepare for development using `pnpm dev:prepare`
4. Start development server using `pnpm dev`