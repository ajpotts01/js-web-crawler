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

module.exports = {
    normaliseURL,
    getURLsFromHTML,
};