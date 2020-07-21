import pushPlugins from '@dword-design/nuxt-push-plugins'
import getPackageName from 'get-package-name'
import P from 'path'

export default function () {
  this.addModule(require.resolve('@/modules/prism'))
  this.options.css.push(
    getPackageName(require.resolve('reset-css')),
    require.resolve('./style.scss')
  )
  this.addTemplate({
    fileName: P.join('theme', 'button.vue'),
    src: require.resolve('./button.vue'),
  })
  pushPlugins(this, {
    fileName: P.join('theme', 'plugin.js'),
    src: require.resolve('./plugin'),
  })
}
