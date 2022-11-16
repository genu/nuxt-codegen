import { defineNuxtModule } from '@nuxt/kit'
import consola from 'consola'
import { basename } from 'pathe'

const logger = consola.withScope('nuxt-codegen')

export interface ModuleOptions {
  configFile: string;
  devOnly: boolean;
  extensions: string[];
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-codegen',
    configKey: 'nuxtCodegen',
    compatibility: {
      nuxt: '>= 3.0.0'
    }
  },
  defaults: {
    configFile: 'codegen.ts',
    devOnly: true,
    extensions: ['.graphql', '.gql']
  },
  setup (options, nuxt) {
    if (options.devOnly && !nuxt.options.dev) {
      logger.info('NuxtCodegen: Skipping Codegen')
      return
    }

    nuxt.hook('build:done', async () => {
      const { generate, loadCodegenConfig } = await import(
        '@graphql-codegen/cli'
      )
      const { config } = await loadCodegenConfig({
        configFilePath: options.configFile
      })
      const start = Date.now()

      await generate({
        ...config
      })
      const time = Date.now() - start

      logger.success(`NuxtCodegen: Finished in ${time}ms `)
    })

    nuxt.hook('builder:watch', (_event, path) => {
      const modifiedConfig = basename(path) === basename(options.configFile)
      const modifiedWatchedExtension = options.extensions.some(extension =>
        path.endsWith(extension)
      )

      if (!modifiedWatchedExtension && !modifiedConfig) {
        return
      }

      nuxt.callHook('build:done')
    })
  }
})
