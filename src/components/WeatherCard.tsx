import { CurrentWeather } from "../lib/weather";

export default function WeatherCard({
  w,
  units,
}: {
  w: CurrentWeather;
  units: "metric" | "imperial";
}) {
  const unitSymbol = units === "metric" ? "°C" : "°F";

  return (
    <div className="mt-4 grid gap-8 md:grid-cols-[2fr_3fr] items-center">
      {/* Left side – big temp + description */}
      <div className="space-y-3 text-left md:text-left">
        <div className="text-3xl font-semibold">
          {w.name}, <span className="text-white/70">{w.country}</span>
        </div>
        <div className="text-white/70 text-lg capitalize">{w.description}</div>
        <div className="flex items-end gap-4 mt-2">
          <span className="text-7xl md:text-8xl font-black leading-none">
            {w.temp}
            {unitSymbol}
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
            alt={w.description}
            className="w-20 h-20 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Right side – mini “forecast” style row */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm md:text-base">
        <div className="glass py-4">
          <div className="text-white/60 uppercase tracking-wide text-xs mb-1">
            Feels like
          </div>
          <div className="text-xl font-semibold">
            {w.feels_like}
            {unitSymbol}
          </div>
        </div>
        <div className="glass py-4">
          <div className="text-white/60 uppercase tracking-wide text-xs mb-1">
            Humidity
          </div>
          <div className="text-xl font-semibold">{w.humidity}%</div>
        </div>
        <div className="glass py-4">
          <div className="text-white/60 uppercase tracking-wide text-xs mb-1">
            Wind
          </div>
          <div className="text-xl font-semibold">
            {w.wind} {units === "metric" ? "m/s" : "mph"}
          </div>
        </div>
      </div>
    </div>
  );
}
