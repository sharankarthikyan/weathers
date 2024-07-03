export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://weather.sharankarthikeyan.com/sitemap.xml",
  };
}
