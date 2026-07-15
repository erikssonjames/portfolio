import { mkdir } from "node:fs/promises"
import path from "node:path"
import { chromium } from "playwright"

const url = process.argv[2] ?? "https://gymquest.jameseriksson.com/"
const outputPath = path.resolve(
  process.cwd(),
  process.argv[3] ?? "public/previews/gym-quest.png"
)

await mkdir(path.dirname(outputPath), { recursive: true })

const browser = await chromium.launch()

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: "dark",
  })

  page.setDefaultNavigationTimeout(60_000)
  await page.goto(url, { waitUntil: "networkidle" })
  await page.waitForTimeout(2_500)

  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
      }
    `,
  })

  await page.screenshot({
    path: outputPath,
    type: "png",
    fullPage: false,
  })

  console.log(`Captured ${url} -> ${outputPath}`)
} finally {
  await browser.close()
}
