export default function sitemap() {
  return [
    {
      url: "https://weather.sharankarthikeyan.com/",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://weather.sharankarthikeyan.com/hourbyhour/",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: "https://weather.sharankarthikeyan.com/tenday/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://weather.sharankarthikeyan.com/daily/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://sharankarthikeyan.com/monthly/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
