const { crawlPage } = require("./crawl");

async function runCrawler(baseUrl) {
    let pages = {};
    pages = await crawlPage(baseUrl, baseUrl, pages);
    console.log("Crawled the following pages:");
    console.log(pages);
}

function main() {
    console.log(process.argv);
    // Process.argv also counts the execution path
    if (process.argv.length != 3) {
        console.log("1 argument required: BASE_URL");
        return
    }

    const baseUrl = process.argv[2];
    console.log(`You entered a base URL of: ${baseUrl}`);
    runCrawler(baseUrl);
}

main();