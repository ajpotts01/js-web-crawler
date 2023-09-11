const { test, expect } = require("@jest/globals");
const { normaliseURL } = require("./crawl.js");

/*
    To "normalize" means to "make the same". 
    So, for example, all of these URLs are the "same page" according to most websites and HTTP standards:

    - https://blog.boot.dev/path/
    - https://blog.boot.dev/path
    - http://blog.boot.dev/path/
    - http://blog.boot.dev/path

    We want our normalizeURL() function to map all of those same inputs to 
    a single normalized output: blog.boot.dev/path.
*/
test("Normalise paths 1", () => {
    expect(normaliseURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test("Normalise paths 2", () => {
    expect(normaliseURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("Normalise paths 3", () => {
    expect(normaliseURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test("Normalise paths 4", () => {
    expect(normaliseURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("Normalise caps 1", () => {
    expect(normaliseURL("http://BLOG.boot.DEV/path")).toBe("blog.boot.dev/path");
});