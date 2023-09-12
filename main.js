const { crawlPage } = require("./crawl");
const { printReport } = require("./report.js");

async function runCrawler(baseUrl) {
    let pages = {};
    pages = await crawlPage(baseUrl, baseUrl, pages);
    return pages;
}

async function main() {
    console.log(process.argv);
    // Process.argv also counts the execution path
    if (process.argv.length != 3) {
        console.log("1 argument required: BASE_URL");
        return
    }

    const baseUrl = process.argv[2];
    console.log(`You entered a base URL of: ${baseUrl}`);
    const pages = await runCrawler(baseUrl);

    printReport(pages);
}

main();