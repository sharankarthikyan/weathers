const wmoCodeDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing light drizzle",
  57: "Freezing dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing light rain",
  67: "Freezing heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export function getWeatherDescription(wmoCode) {
  return wmoCodeDescriptions[wmoCode] || "Unknown weather code";
}

export function calculateDayAndNightTemperatures(data) {
  let dayTemps = [];
  let nightTemps = [];

  for (let i = 0; i < data.time.length; i++) {
    let hour = new Date(data.time[i]).getHours();
    let temperature = data.temperature_2m[i];

    if (hour >= 6 && hour < 18) {
      dayTemps.push(temperature);
    } else {
      nightTemps.push(temperature);
    }
  }

  const average = (temps) =>
    temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

  return {
    averageDayTemperature: average(dayTemps),
    averageNightTemperature: average(nightTemps),
  };
}
