import nuxtConfig from '@dword-design/base-config-nuxt/dist/nuxt.config'
import puppeteer from '@dword-design/puppeteer'
import tester from '@dword-design/tester'
import testerPluginNuxt from '@dword-design/tester-plugin-nuxt'
import { toMatchImage } from 'jest-image-matcher'
import P from 'path'

expect.extend({ toMatchImage })

export default tester(
  {
    'add row': async function () {
      await this.page.goto('http://localhost:3000')
      const button = await this.page.waitForSelector('table + button')
      await button.evaluate(el => el.click())
      const screenshot = await this.page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImage(
        P.join(__dirname, '-fixtures', 'add-row.png'),
        { dumpDiffToConsole: true }
      )
    },
    'delete row': async function () {
      await this.page.goto('http://localhost:3000')
      const button = await this.page.waitForSelector(
        'table tbody tr:first-child button'
      )
      await button.evaluate(el => el.click())
      const screenshot = await this.page.screenshot({
        fullPage: true,
      })
      expect(screenshot).toMatchImage(
        P.join(__dirname, '-fixtures', 'delete-row.png'),
        { dumpDiffToConsole: true }
      )
    },
    'focus input': async function () {
      await this.page.goto('http://localhost:3000')
      const dateInput = await this.page.waitForSelector(
        'table tbody tr:first-child td:first-child input'
      )
      await dateInput.evaluate(el => el.focus())
      const screenshot = await this.page.screenshot({
        fullPage: true,
      })
      expect(screenshot).toMatchImage(
        P.join(__dirname, '-fixtures', 'focus-input.png'),
        { dumpDiffToConsole: true }
      )
    },
    async init() {
      await this.page.goto('http://localhost:3000')
      const screenshot = await this.page.screenshot({
        fullPage: true,
      })
      expect(screenshot).toMatchImage(
        P.join(__dirname, '-fixtures', 'init.png'),
        { dumpDiffToConsole: true }
      )
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
      const screenshot = await this.page.screenshot({
        fullPage: true,
      })
      expect(screenshot).toMatchImage(
        P.join(__dirname, '-fixtures', 'input-data.png'),
        { dumpDiffToConsole: true }
      )
    },
  },
  [
    testerPluginNuxt(nuxtConfig),
    {
      after() {
        return this.browser.close()
      },
      async before() {
        this.browser = await puppeteer.launch({
          args: ['--enable-font-antialiasing'],
        })
        this.page = await this.browser.newPage()
      },
    },
  ]
)
