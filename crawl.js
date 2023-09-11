function normaliseURL(path) {
    const parsedURL = new URL(path);
    let normalisedURL = `${parsedURL.hostname}${parsedURL.pathname}`;

    if (normalisedURL.length > 0 && normalisedURL.slice(-1) === "/") {
        normalisedURL = normalisedURL.slice(0, -1);
    }

    return normalisedURL;   
}

module.exports = {
    normaliseURL
};