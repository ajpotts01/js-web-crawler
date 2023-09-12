const { crawlPage } = require("./crawl");

function main() {
    // Process.argv also counts the execution path
    if (process.argv.length != 3) {
        console.log("1 argument required: BASE_URL");
        return
    }

    const baseUrl = process.argv[2];
    console.log(`You entered a base URL of: ${baseUrl}`);

    crawlPage(baseUrl);
}

main();