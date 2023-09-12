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
    console.log(result);
    return result;
}

function handleHttpStatusCode(statusCode) {
    if (statusCode >= 400 && statusCode < 500) {
        return "Error";
    }

    if (statusCode >= 200 && statusCode < 300) {
        return "Success";
    }

    return "Unknown";
}

async function crawlPage(url) {
    try {
        response = await fetch(url);
        reqStatus = handleHttpStatusCode(response.statusCode);
        reqStatus &= response.headers["content-type"] === "text/html";
    } catch (ex) {
        reqStatus = "Error";
    }

    if (reqStatus === "Error") {
        console.log(`There was an error crawling ${url}.`);
    } else {
        console.log("Page successfully loaded!");
        console.log(await response.text());
    }
}

module.exports = {
    normaliseURL,
    getURLsFromHTML,
    handleHttpStatusCode,
    crawlPage
};