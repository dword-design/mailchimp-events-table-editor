import nuxtConfig from '@dword-design/base-config-nuxt/dist/nuxt.config'
import tester from '@dword-design/tester'
import testerPluginNuxt from '@dword-design/tester-plugin-nuxt'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import { toMatchImage } from 'jest-image-matcher'
import nodemailer from 'nodemailer'
import P from 'path'

const transport = nodemailer.createTransport({
  auth: {
    pass: 'e49e4f04c1fd9d',
    user: '42d4583fb25b92',
  },
  host: 'smtp.mailtrap.io',
  port: 2525,
})
expect.extend({ toMatchImage })

export default tester(
  {
    'add row': async function () {
      await this.page.goto('http://localhost:3000')
      const button = await this.page.waitForSelector('table + button')
      await button.evaluate(el => el.click())
      const screenshot = await this.page.screenshot({
        fullPage: true,
        // path: P.join(__dirname, '-fixtures', 'add-row.png'),
      })
      await transport.sendMail({
        attachments: {
          content: screenshot,
          contentType: 'image/png',
          filename: 'screenshot.png',
        },
        from: 'a@b.de',
        subject: 'Screenshot',
        to: 'info@dword-design.de',
      })
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
        // path: P.join(__dirname, '-fixtures', 'delete-row.png'),
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
        // path: P.join(__dirname, '-fixtures', 'focus-input.png'),
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
        // path: P.join(__dirname, '-fixtures', 'init.png'),
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
        // path: P.join(__dirname, '-fixtures', 'input-data.png'),
      })
      expect(screenshot).toMatchImage(
        P.join(__dirname, '-fixtures', 'input-data.png'),
        { dumpDiffToConsole: true }
      )
    },
  },
  [testerPluginNuxt(nuxtConfig), testerPluginPuppeteer()]
)
