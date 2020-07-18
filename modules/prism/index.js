import pushPlugins from '@dword-design/nuxt-push-plugins'
import getPackageName from 'get-package-name'

export default function () {
  this.options.css.push(
    `${getPackageName(require.resolve('prismjs'))}/themes/prism.css`
  )
  pushPlugins(this, require.resolve('./plugin'))
}
