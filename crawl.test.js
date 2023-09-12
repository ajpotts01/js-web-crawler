const { test, expect } = require("@jest/globals");
const { normaliseURL, getURLsFromHTML } = require("./crawl.js");

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

/*
getURLsFromHTML(htmlBody, baseURL) takes 2 arguments. The first is an HTML string as we discussed earlier, 
while the second is the root URL of the website we're crawling. 
This will allow us to rewrite relative URLs into absolute URLs.

It returns an un-normalized array of all the URLs found within the HTML.
*/
test("Extract URLS 1", () => {
    const html = "<html><head><title>Yep</title></head><body><div><p>Hello</p><a href='/what.html'/></div><a href='/yeah.html'/></body></html>"

    expect(getURLsFromHTML(html, "https://www.ajpcloudblog.com")).toStrictEqual(["https://www.ajpcloudblog.com/what.html", "https://www.ajpcloudblog.com/yeah.html"]);
});

test('Extract URLs absolute', () => {
    const inputURL = 'https://ajpcloudblog.com'
    const inputBody = '<html><body><a href="https://ajpcloudblog.com"><span>AJP Cloud Blog</span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://ajpcloudblog.com/' ]
    expect(actual).toEqual(expected)
});

test('Extract URLs relative', () => {
    const inputURL = 'https://www.ajpcloudblog.com'
    const inputBody = '<html><body><a href="/path/one"><span>AJP Cloud Blog</span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://www.ajpcloudblog.com/path/one' ]
    expect(actual).toEqual(expected)
});

test('Extract URLs handle error', () => {
    const inputURL = 'https://www.ajpcloudblog.com'
    const inputBody = '<html><body><a href="path/one"><span>AJP Cloud Blog</span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
});