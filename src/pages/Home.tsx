import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import WeatherCard from "../components/WeatherCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import WelcomeState from "../components/WelcomeState";
import { fetchByCity, fetchByCoords, CurrentWeather } from "../lib/weather";

export default function Home() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<CurrentWeather | null>(null);

  const unitLabel = useMemo(() => (units === "metric" ? "°C" : "°F"), [units]);

  useEffect(() => {
    void handleCity("London"); // default city on load
  }, []);

  async function handleCity(city: string) {
    if (!city.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const w = await fetchByCity(city.trim(), units);
      setData(w);
      setQuery(city.trim());
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLocate() {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported in this browser.");
      return;
    }
    setLoading(true);
    setError(null);

    const getPos = () =>
      new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        })
      );

    try {
      const pos = await getPos();
      const w = await fetchByCoords(pos.coords.latitude, pos.coords.longitude, units);
      setData(w);
      setQuery("");
    } catch (e: any) {
      setError(e?.message ?? "Location access denied");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  // re-fetch when units toggle
  useEffect(() => {
    if (data) {
      if (query) void handleCity(query);
      else void handleLocate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return (
    <div className="app-shell">
      {/* Top bar */}
      <header className="flex items-center justify-between py-4">
        <a href="#" className="text-xl font-extrabold tracking-tight">
          Weather<span className="text-sky-300">Buddy</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnits((u) => (u === "metric" ? "imperial" : "metric"))}
            className="btn-ghost"
          >
            Units: {unitLabel}
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main “hero” card */}
      <section className="mt-6 glass px-6 py-8 md:px-10 md:py-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Live Weather, Anywhere
          </h1>
          <p className="text-white/70 mt-2 text-lg">
            Search a city, or use your location to see what the sky is doing.
          </p>
        </div>

        {/* Search + location row */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <SearchBar onSearch={handleCity} />
          <LocationButton onClick={handleLocate} />
        </div>

        {/* State views inside the card */}
        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && !data && <WelcomeState />}

        {!loading && !error && data && (
          <WeatherCard w={data} units={units} />
        )}
      </section>

      <footer className="text-center text-white/60 mt-6 text-sm">
        Built with React · Vite · Tailwind · Data from OpenWeatherMap
      </footer>
    </div>
  );
}
