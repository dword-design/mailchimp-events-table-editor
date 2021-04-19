import packageName from 'depcheck-package-name'
import nuxtPushPlugins from 'nuxt-push-plugins'
import P from 'path'

export default function () {
  this.addModule(require.resolve('../prism'))
  this.options.css.push(
    packageName`reset-css`,
    packageName`@fontsource/open-sans`,
    require.resolve('./style.scss')
  )
  this.addTemplate({
    fileName: P.join('theme', 'button.vue'),
    src: require.resolve('./button.vue'),
  })
  nuxtPushPlugins(this, {
    fileName: P.join('theme', 'plugin.js'),
    src: require.resolve('./plugin'),
  })
}
