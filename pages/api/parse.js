import puppeteer from "puppeteer";
import { load } from "cheerio";

const scrapeWebPage = async (req, res) => {
	const { url } = req.body;

	if (!url) {
		return res.status(400).json({ error: "Missing URL parameter" });
	}

	try {
		const browser = await puppeteer.launch({ headless: "new" });
		const page = await browser.newPage();
		await page.goto(url);
		const content = await page.content(); //посмотреть еще варианты
		await browser.close();

		const $ = load(content);
		let text = "";
		$("p, h1, h2, h3, h4, h5, h6, a, span").each((i, elem) => {
			let elementText = $(elem)
				.text()
				.trim();
			if (elementText) {
				text += elementText + "\n";
			}
		});

		return res.status(200).json({ parsedContent: text });
	} catch (error) {
		return res.status(500).json({ error: "Error parsing website" });
	}
};

export default scrapeWebPage;
