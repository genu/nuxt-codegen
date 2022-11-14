import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  externals: ['@graphql-codegen/cli']
})
