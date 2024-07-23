// const puppeteer = require("pupperteer");
import puppeteer from "puppeteer";

const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //get blurb 1
  const p1 = await page
    .locator("text/The main way in which a political party gains power")
    .waitHandle();
  const blurb1 = await p1?.evaluate((el) => el.textContent);

  //get blurb 2
  const p2 = await page
    .locator(
      "text/Government leaders are the most powerful members of political parties"
    )
    .waitHandle();
  const blurb2 = await p2?.evaluate((el) => el.textContent);

  //get blurb 3
  const p3 = await page
    .locator("text/Some countries have several parties")
    .waitHandle();
  const blurb3 = await p3?.evaluate((el) => el.textContent);

  //get blurb 4
  const p4 = await page
    .locator("text/Democratic Party and the Republican Party.")
    .waitHandle();
  const blurb4 = await p4?.evaluate((el) => el.textContent);

  //get blurb 5
  const p5 = await page
    .locator("text/several African countries have such systems")
    .waitHandle();
  const blurb5 = await p5?.evaluate((el) => el.textContent);

  console.log({ blurb1, blurb2, blurb3, blurb4, blurb5 });

  await browser.close();
};

scrapeProduct(
  "https://kids.britannica.com/kids/article/political-party/353648"
);
