import createBrowser from "browserless";
import termImg from "term-img";
import uniqueRandomArray from "unique-random-array";

const BACKGROUNDS = [
  "linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
  "linear-gradient(225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)",
  "linear-gradient(225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)",
  "linear-gradient(225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)",
  "linear-gradient(225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)",
  "linear-gradient(90deg, #495AFF 0%, #0ACFFE 100%)",
  "linear-gradient(0deg, #6713D2 0%, #CC208E 100%)",
  "linear-gradient(270deg, #EC8C69 0%, #ED6EA0 100%)",
  "linear-gradient(0deg, #FE5196 0%, #F77062 100%)",
  "linear-gradient(270deg, #F9D423 0%, #F83600 100%)",
  "linear-gradient(270deg, #FE9A8B 0%, #FD868C 41%, #F9748F 73%, #F78CA0 100%)",
  "linear-gradient(0deg, #6F86D6 0%, #48C6EF 100%)",
  "linear-gradient(0deg, #FA71CD 0%, #C471F5 100%)",
  "linear-gradient(270deg, #6A11CB 0%, #2575FC 100%)",
  "linear-gradient(270deg, #B465DA 0%, #CF6CC9 28%, #EE609C 68%, #EE609C 100%)",
  "linear-gradient(0deg, #330867 0%, #30CFD0 100%)",
  "linear-gradient(270deg, #FEE140 0%, #FA709A 100%)",
];

const randBackground = uniqueRandomArray(BACKGROUNDS);

const browser = createBrowser();
const run = async () => {
  const browserless = await browser.createContext();

  const url = new URL(
    "http://localhost:3000?" +
      new URLSearchParams({
        t: "hola",
        p: "jonathanmv",
      }).toString()
  );

  const buffer = await browserless.screenshot(url, {
    overlay: {
      background: randBackground(),
    },
  });

  console.log(termImg(buffer));

  await browserless.destroyContext();
  await browser.close();
};

run()
  .then(() => console.log("Done!"))
  .catch((err) => console.error(err));
