const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const createBrowser = require("browserless");
const saveBufferToFile = (buffer, fileName) => {
  const wstream = require("fs").createWriteStream(fileName);
  wstream.write(buffer);
  wstream.end();
};
// First, create a browserless factory
// that it will keep a singleton process running
const browser = createBrowser({ puppeteer });

async function run() {
  // After that, you can create as many browser context
  // as you need. The browser contexts won't share cookies/cache
  // with other browser contexts.
  const browserless = await browser.createContext();

  const getUrls = browserless.evaluate(
    async (page, response) => {
      console.log("response", {
        statusCode: response.status(),
        url: response.url(),
        redirectUrls: response.request().redirectChain(),
      });

      console.log("Running custom code on the page");
      const result = await page.evaluate(
        `function getUrls() {
        const urls = [];
        document
          .querySelectorAll('link[href*="cdn.midjourney.com"]')
          .forEach((link) => {
            urls.push(link.href.replace(/([0-3]_[0-3])(.*)(\.webp)$/, "$1$3"));
          });

        // Remove invalid urls
        return urls.filter((u) => u.length > 50);
      }
      JSON.stringify(getUrls())
      `
      );

      console.log("result", result);
      return result;
    },
    {
      device: "iPhone 6",
      waitForSelector: "link[href*='cdn.midjourney.com']",
    }
  );

  console.log("getting urls");
  const resGetUrls = await getUrls(
    "https://midjourney.com/app/search/?search=Aston%20Martin%20DBS%20Superleggera"
  );
  console.log("resGetUrls", resGetUrls);

  const buffer = await browserless.screenshot(
    "https://midjourney.com/app/search/?search=Aston%20Martin%20DBS%20Superleggera",
    {
      device: "iPhone 6",
    }
  );
  const fileName = Date.now() + "search.png";
  saveBufferToFile(buffer, fileName);
  console.log(`your screenshot is here: `, fileName);

  // After your task is done, destroy your browser context
  await browserless.destroyContext();

  // At the end, gracefully shutdown the browser process
  await browser.close();

  // const puppeteer = require("puppeteer-extra");
  // const StealthPlugin = require("puppeteer-extra-plugin-stealth");
  // puppeteer.use(StealthPlugin());

  // const browserless = require("browserless")({ puppeteer });

  // browserless
  //   .screenshot(
  //     "https://cdn.midjourney.com/2310cee6-86f8-47d8-8ad4-909c4e96f1c1/0_0.webp",
  //     { device: "iPhone 6" }
  //   )
  //   .then((buffer) => {
  //     const fileName = "screenshot.png";
  //     saveBufferToFile(buffer, fileName);
  //     console.log(`your screenshot is here: `, fileName);
  //   });
}

run()
  .then(() => console.log("done"))
  .catch((e) => console.error(e))
  .finally(() => process.exit());
