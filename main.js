const { normaliseURL, getURLsFromHTML } = require("./crawl");

normaliseURL("https://blog.boot.dev/path/")

const html = "<html><head><title>Yep</title></head><body><div><p>Hello</p><a href='/what.html'/></div><a href='/yeah.html'/></body></html>";
const baseUrl = "https://ajpcloudblog.com";

getURLsFromHTML(html, baseUrl);