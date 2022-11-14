import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_URL,
  documents: 'graphql/**/*.graphql',
  generates: {
    'graphql/client.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-urql']
    },
    'graphql/schema-introspection.ts': {
      plugins: ['urql-introspection']
    }
  }
}

export default config
