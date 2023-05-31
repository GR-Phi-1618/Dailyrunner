import { remote } from "webdriverio";
import * as fs from "fs";

const tickerList = fs.readFileSync("Equity.csv", "utf-8");
const tickerArray = tickerList.split(/\r?\n/);

(async () => {
	const browser = await remote({
		capabilities: {
			browserName: "chrome",
			"goog:chromeOptions": {
				args: ["--headless", "--disable-gpu"],
				binary: "/usr/bin/google-chrome",
			},
		},
	});
	for (const ticker of tickerArray) {
		await browser.url(
			`https://www.bseindia.com/stock-share-price/abb-india-limited/abb/${ticker}`,
		);
		const tem = await browser.$('strong[id="idcrval"]');
		const closePrice = Number(await tem.getText());
		const tem2 = await browser.$$('td[class="textvalue ng-binding"]');
		const openPrice = Number(await tem2[0].getText());
		const pClosePrice = Number(await tem2[1].getText());
		const todayperc = (100 * (closePrice - openPrice)) / openPrice;
		const intraperc = (100 * (openPrice - pClosePrice)) / pClosePrice;
		fs.appendFile(
			`data/${ticker}`,
			`${intraperc}\n${todayperc}\n`,
			function (err) {
				if (err) throw err;
			},
		);
	}
})();
