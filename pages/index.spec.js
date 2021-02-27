import nuxtConfig from '@dword-design/base-config-nuxt/dist/nuxt.config'
import tester from '@dword-design/tester'
import testerPluginNuxt from '@dword-design/tester-plugin-nuxt'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'

export default tester(
  {
    'add row': async function () {
      await this.page.goto('http://localhost:3000')
      const button = await this.page.waitForSelector('table + button')
      await button.evaluate(el => el.click())
      const screenshot = await this.page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImageSnapshot(this)
    },
    'delete row': async function () {
      await this.page.goto('http://localhost:3000')
      const button = await this.page.waitForSelector(
        'table tbody tr:first-child button'
      )
      await button.evaluate(el => el.click())
      const screenshot = await this.page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImageSnapshot(this)
    },
    'focus input': async function () {
      await this.page.goto('http://localhost:3000')
      const dateInput = await this.page.waitForSelector(
        'table tbody tr:first-child td:first-child input'
      )
      await dateInput.evaluate(el => el.focus())
      const screenshot = await this.page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImageSnapshot(this)
    },
    async init() {
      await this.page.goto('http://localhost:3000')
      const screenshot = await this.page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImageSnapshot(this)
    },
    'input data': async function () {
      await this.page.goto('http://localhost:3000')
      const dateInput = await this.page.waitForSelector(
        'table tbody tr:first-child td:first-child input'
      )
      await dateInput.evaluate(el => (el.value = '23.04.2008'))
      const eventInput = await this.page.waitForSelector(
        'table tbody tr:first-child td:nth-child(2) input'
      )
      await eventInput.evaluate(el => (el.value = 'Foo Bar'))
      const screenshot = await this.page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImageSnapshot(this)
    },
  },
  [testerPluginNuxt(nuxtConfig), testerPluginPuppeteer()]
)
