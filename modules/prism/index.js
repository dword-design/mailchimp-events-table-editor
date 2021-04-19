import packageName from 'depcheck-package-name'
import nuxtPushPlugins from 'nuxt-push-plugins'

export default function () {
  this.options.css.push(
    `${packageName`prismjs`}/themes/prism.css`,
    packageName`@fontsource/source-code-pro`,
    require.resolve('./style.scss')
  )
  nuxtPushPlugins(this, require.resolve('./plugin'))
}
