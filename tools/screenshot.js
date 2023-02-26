const path = require('path')
const fsPromises = require('fs/promises')
const puppeteer = require('puppeteer')

if (require.main === module) {
  main()
}

async function main () {
  try {
    const browser = await puppeteer.launch()

    try {
      const page = await browser.newPage() 
      const targets = [
        ['http://localhost:3000', 'top.png'],
      ]

      await page.setViewport({
        width: 1024,
        height: 768,
        deviceScaleFactor: 1,
      })

      for (const [url, filename] of targets) {
        const dirname = path.join(__dirname, 'img')
        const destination = path.join(dirname, filename)

        await fsPromises.mkdir(path.dirname(destination), {
          recursive: true,
        })

        await page.goto(url)
        await page.screenshot({path: destination})
      }
    } finally {
      await browser.close()
    }
  } catch (err) {
    console.error(err)
  }
}