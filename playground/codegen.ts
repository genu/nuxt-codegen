import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './playgroud/schema.graphql',
  documents: '**/graphql/**/*.graphql',
  generates: {
    'playground/generated/client.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-urql']
    },
    'playground/generated/schema-introspection.ts': {
      plugins: ['urql-introspection']
    }
  }
}

export default config
