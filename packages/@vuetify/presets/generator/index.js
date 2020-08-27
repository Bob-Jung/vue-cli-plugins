// Imports
const fs = require('fs')

module.exports = (api, { preset }) => {
  if (!api.hasPlugin('vuetify')) {
    console.log('`@vuetify/presets` requires the `vue-cli-plugin-vuetify` package.')

    return
  }

  api.render(`./templates/${preset}`)

  api.extendPackage({
    devDependencies: {
      'eslint-config-vuetify': '^0.6.1',
      'eslint-plugin-vuetify': '^1.0.0-beta.6',
      'eslint-plugin-vue': '^6.2.2',
      lodash: '^4.17.15',
      webfontloader: '^1.6.28',
    },
  })

  api.injectImports(api.entryFile, 'import \'./plugins\'')

  api.onCreateComplete(() => {
    const presetName = `Vuetify ${preset} preset`
    const projectName = api.rootOptions.projectName

    const about = api.resolve('src/views/About.vue')
    const home = api.resolve('src/views/Home.vue')

    if (fs.existsSync(about)) fs.unlinkSync(about)
    if (fs.existsSync(home)) fs.unlinkSync(home)

    api.exitLog(`🍣  Successfully generated ${projectName} from the ${presetName}.\n`)
  })
}
