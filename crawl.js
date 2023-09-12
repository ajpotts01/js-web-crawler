const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normaliseURL(path) {
    const parsedURL = new URL(path);
    let normalisedURL = `${parsedURL.hostname}${parsedURL.pathname}`;

    if (normalisedURL.length > 0 && normalisedURL.slice(-1) === "/") {
        normalisedURL = normalisedURL.slice(0, -1);
    }

    return normalisedURL;   
}

function getURLsFromHTML(html, baseURL) {
    const dom = new JSDOM(html);
    let result = [];

    const links = dom.window.document.querySelectorAll("a");
    for (let link of links) {
        try {
            if (link.href.slice(0, 1) === "/") {
                result.push(new URL(link.href, baseURL).href);
            } else {
                result.push(new URL(link.href).href);
            }
        } catch (ex) {
            console.log(`${ex.message} attempting to get ${link.href}`);
        }
    }
    return result;
}

function handleHttpStatusCode(statusCode) {
    console.log(`Received status code: ${statusCode}`);

    if (statusCode >= 400 && statusCode < 500) {
        return "Error";
    }

    if (statusCode >= 200 && statusCode < 300) {
        return "Success";
    }

    return "Unknown";
}

async function crawlPage(baseUrl, currentUrl, pages) {
    const currentUrlNorm = normaliseURL(currentUrl);

    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);

    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        console.log(`Host mismatch: ${baseUrlObj.hostname} vs ${currentUrlObj.hostname}`);
        return pages;
    }

    if (pages[currentUrlNorm] > 0) {
        console.log(`${currentUrlNorm} has already been crawled!`);
        pages[currentUrlNorm]++;
        return pages;
    }

    if (currentUrl !== baseUrl) {
        pages[currentUrlNorm] = 1;
    } else {
        pages[currentUrlNorm] = 0;
    }

    try {
        console.log(`Making a request to ${currentUrl}`);

        response = await fetch(currentUrl);
        reqStatus = handleHttpStatusCode(response.status);
        reqStatus &= response.headers["content-type"] === "text/html";
    } catch (ex) {
        console.log(ex);
        reqStatus = "Error";
    }

    if (reqStatus === "Error") {
        console.log(`There was an error crawling ${currentUrl}.`);
        return pages;
    } else {
        console.log("Page successfully loaded!");
        let pageBody = await response.text();
        let pageUrls = getURLsFromHTML(pageBody, baseUrl);

        for (const url of pageUrls) {
            console.log(`Crawling: ${url}`);
            pages = await crawlPage(baseUrl, url, pages);
        }
    }

    return pages;
}

module.exports = {
    normaliseURL,
    getURLsFromHTML,
    handleHttpStatusCode,
    crawlPage
};