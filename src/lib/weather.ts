export async function fetchByCity(
  city: string,
  units: "metric" | "imperial"
): Promise<CurrentWeather> {
  const url = `${API}/weather?q=${encodeURIComponent(city)}&appid=${KEY}&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    console.error("OpenWeatherMap error (city):", res.status, data);
    throw new Error(data?.message || "Request failed");
  }

  return normalize(data);
}

export async function fetchByCoords(
  lat: number,
  lon: number,
  units: "metric" | "imperial"
): Promise<CurrentWeather> {
  const url = `${API}/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    console.error("OpenWeatherMap error (coords):", res.status, data);
    throw new Error(data?.message || "Request failed");
  }

  return normalize(data);
}
const API = "https://api.openweathermap.org/data/2.5";
const KEY = import.meta.env.VITE_OWM_API_KEY;

export interface CurrentWeather {
  name: string;
  country: string;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: number;
}

function normalize(data: any): CurrentWeather {
  return {
    name: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed),
  };
}