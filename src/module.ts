import { defineNuxtModule, logger } from '@nuxt/kit'
import { generate, loadCodegenConfig } from '@graphql-codegen/cli'

export interface ModuleOptions {
  configFile: string
  devOnly: boolean
  extensions: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-codegen',
    configKey: 'nuxtCodegen'
  },
  defaults: {
    configFile: 'codegen.ts',
    devOnly: true,
    extensions: ['.graphql', '.gql']
  },
  async setup (options, nuxt) {
    if (options.devOnly && !nuxt.options.dev) {
      logger.info('NuxtCodegen: Skipping Codegen')
      return
    }

    const { config } = await loadCodegenConfig({
      configFilePath: options.configFile
    })

    nuxt.hook('build:before', async () => {
      const start = Date.now()

      await generate({
        ...config
      })
      const time = Date.now() - start

      logger.success(`NuxtCodegen: Finished in ${time}ms `)
    })

    nuxt.hook('builder:watch', (_event, path) => {
      const modifiedWatchedExtension = options.extensions.some(extension => path.endsWith(extension))

      if (!modifiedWatchedExtension) {
        logger.info('NuxtCodegen: No changes - Skipping')

        return
      }

      nuxt.callHook('build:before')
    })
  }
})
