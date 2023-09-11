function normaliseURL(path) {
    const parsedURL = new URL(path);
    let normalisedURL = "";
    let pathname = parsedURL.pathname;

    if (pathname.substring(pathname.length-1) == "/") {
        pathname = pathname.slice(0, -1);
    }

    normalisedURL += parsedURL.hostname + pathname;
    return normalisedURL;   
}

module.exports = {
    normaliseURL
};