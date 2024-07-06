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

export function findTemperatureTrends(time, temperature, precipitation) {
  const timePeriods = {
    morning: { start: 6, end: 12, temperatures: [], precipitations: [] },
    afternoon: { start: 12, end: 18, temperatures: [], precipitations: [] },
    evening: { start: 18, end: 24, temperatures: [], precipitations: [] },
    night: { start: 0, end: 6, temperatures: [], precipitations: [] },
  };

  time.forEach((time, index) => {
    const hour = new Date(time).getHours();
    const temp = temperature[index];
    const prec = precipitation[index];

    if (hour >= timePeriods.morning.start && hour < timePeriods.morning.end) {
      timePeriods.morning.temperatures.push(temp);
      timePeriods.morning.precipitations.push(prec);
    } else if (
      hour >= timePeriods.afternoon.start &&
      hour < timePeriods.afternoon.end
    ) {
      timePeriods.afternoon.temperatures.push(temp);
      timePeriods.afternoon.precipitations.push(prec);
    } else if (
      hour >= timePeriods.evening.start &&
      hour < timePeriods.evening.end
    ) {
      timePeriods.evening.temperatures.push(temp);
      timePeriods.evening.precipitations.push(prec);
    } else if (
      hour >= timePeriods.night.start &&
      hour < timePeriods.night.end
    ) {
      timePeriods.night.temperatures.push(temp);
      timePeriods.night.precipitations.push(prec);
    }
  });

  const calculateTrend = (values) => {
    if (values.length === 0) return 0;
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  };

  return [
    {
      key: "morning",
      temperature: calculateTrend(timePeriods.morning.temperatures),
      precipitation: calculateTrend(timePeriods.morning.precipitations),
    },
    {
      key: "afternoon",
      temperature: calculateTrend(timePeriods.afternoon.temperatures),
      precipitation: calculateTrend(timePeriods.afternoon.precipitations),
    },
    {
      key: "evening",
      temperature: calculateTrend(timePeriods.evening.temperatures),
      precipitation: calculateTrend(timePeriods.evening.precipitations),
    },
    {
      key: "night",
      temperature: calculateTrend(timePeriods.night.temperatures),
      precipitation: calculateTrend(timePeriods.night.precipitations),
    },
  ];
}

export function calculateDewPoint(temperature, humidity) {
  const b = 17.62;
  const c = 243.12;
  const gamma =
    (b * temperature) / (c + temperature) + Math.log(humidity / 100);
  const dewPoint = (c * gamma) / (b - gamma);
  return dewPoint.toFixed(2); // Rounded to 2 decimal places
}

export function getCurrentHourApparentTemperature(
  timeArray,
  apparentTemperatureArray
) {
  // Find index of currentTime in timeArray
  const index = timeArray.findIndex(
    (time) => time === getCurrentTimeInFormat()
  );

  // If index is found, return corresponding apparent temperature
  if (index !== -1) {
    return apparentTemperatureArray[index];
  } else {
    return null; // Handle case where currentTime is not found in timeArray
  }
}

export function getCurrentTimeInFormat() {
  // Create a new Date object
  let now = new Date();

  // Get the current year, month, day, and hour
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
  let day = ("0" + now.getDate()).slice(-2);
  let hour = ("0" + now.getHours()).slice(-2);

  // Construct the formatted date-time string
  let formattedDateTime = `${year}-${month}-${day}T${hour}:00`;

  return formattedDateTime;
}

export function findFiveHrForcast(time, temperature, precipitation) {
  let currentTime = getCurrentTimeInFormat();
  let result = [];
  let index = time.indexOf(currentTime);

  result.push({
    key: "Now",
    temperature: temperature[index],
    precipitation: precipitation[index],
  });

  index++;

  for (let i = index; i < index + 4; i++) {
    let key = time[i].split("T")[1];
    result.push({
      key,
      temperature: temperature[i],
      precipitation: precipitation[i],
    });
  }
  return result;
}

export function findFiveDaysForcast(
  time,
  temperatureMin,
  temperatureMax,
  precipitation
) {
  let result = [];

  for (let i = 0; i < 5; i++) {
    let day = new Date(time[i])
      .toLocaleDateString("us", { weekday: "long" })
      .slice(0, 3);
    let dayNum = new Date(time[i]).getDate();
    result.push({
      key: day + " " + dayNum,
      temperature_min: temperatureMin[i],
      temperature_max: temperatureMax[i],
      precipitation: precipitation[i],
    });
  }

  return result;
}

export function hourlyWeatherForcast(
  time,
  temperature,
  apparentTemperature,
  weatherCode,
  precipitationProbability,
  windSpeed,
  humidity
) {
  let result = [];

  let currentTime = getCurrentTimeInFormat();
  let index = time.indexOf(currentTime);

  for (let i = index; i < index + 48; i++) {
    result.push({
      dayOrTime: time[i],
      temp: temperature[i],
      weather: wmoCodeDescriptions[weatherCode[i]],
      precipitation: precipitationProbability[i],
      wind: windSpeed[i],
      subObj: { feelsLike: apparentTemperature[i], humidity: humidity[i] },
      isHourly: true,
    });
  }
  return result;
}

export function tenDayWeatherForcast(
  time,
  temperature,
  temperatureMin,
  apparentTemperature,
  weatherCode,
  precipitationProbability,
  windSpeed,
  sunrise,
  sunset,
  uvIndexMax,
  windDirection
) {
  let result = [];

  for (let i = 0; i < time.length; i++) {
    result.push({
      dayOrTime: time[i],
      temp: temperature[i],
      tempMin: temperatureMin[i],
      weather: wmoCodeDescriptions[weatherCode[i]],
      precipitation: precipitationProbability[i],
      wind: windSpeed[i],
      isHourly: false,
      subObj: {
        feelsLike: apparentTemperature[i],
        sunrise: sunrise[i],
        sunset: sunset[i],
        uvIndexMax: uvIndexMax[i],
        windDirection: windDirection[i],
      },
    });
  }
  return result;
}
