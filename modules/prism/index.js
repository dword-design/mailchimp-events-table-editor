import pushPlugins from '@dword-design/nuxt-push-plugins'
import packageName from 'depcheck-package-name'

export default function () {
  this.options.css.push(
    `${packageName`prismjs`}/themes/prism.css`,
    packageName`@fontsource/source-code-pro`,
    require.resolve('./style.scss')
  )
  pushPlugins(this, require.resolve('./plugin'))
}
