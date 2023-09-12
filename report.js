function sortPages(pages) {
    // Probably could use map here
    result = []

    for (const key in pages) {
        result.push([key, pages[key]]);
    }

    result.sort((x, y) => {
        return y[1] - x[1];
    });

    return result;
}

function printReport(pages) {
    sorted = sortPages(pages);

    console.log("Starting report...");
    console.log("====================");
    for (const pg of sorted) {
        const count = pg[1];
        const url = pg[0];

        console.log(`Found ${count} internal links to ${url}`);
    }
    console.log("====================");
    console.log("End of report");
}

module.exports = {
  printReport  
};