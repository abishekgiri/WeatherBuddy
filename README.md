# WeatherBuddy
WeatherBuddy — Full Project Documentation
1. Introduction
WeatherBuddy is a modern, interactive weather application designed to provide real-time weather information
for any city in the world. Users can manually search cities or use their device’s location to retrieve live
weather conditions including temperature, humidity, wind speed, and more.
The app is inspired by the clean and aesthetic layout of Apple’s Weather application.
2. Objectives
- Build a functional, fast, and interactive weather application.
- Implement real-time data fetching using OpenWeatherMap API.
- Integrate HTML5 geolocation to detect user’s location automatically.
- Design a modern, clean UI using Tailwind CSS with glassmorphism.
- Demonstrate environment variable usage and API security in a Vite project.
3. Technologies Used
Frontend Framework:
- React (TypeScript): Component-based UI building.
 
Development Tool:
- Vite: Fast bundler and dev server.
 
Styling Framework:
- Tailwind CSS: Utility-first CSS framework enabling rapid UI development.
- Custom Glassmorphism styling added via Tailwind + @layer.
 
APIs:
- OpenWeatherMap API: Provides live weather and metadata.
- HTML5 Geolocation API: Retrieves latitude and longitude.
 
Languages:
- TypeScript
- JavaScript (ES modules)
- HTML5
- CSS3
4. Features
WeatherBuddy includes the following key features:
 
1. Global City Search
- Users can enter any city name, worldwide.
- Supports country codes (e.g., “Galloway, US”).
 
2. Use My Location
- Utilizes HTML5 geolocation to fetch precise coordinates.
- Automatically displays weather for the user's real position.
 
3. Temperature Unit Toggle
- Switch between Celsius (°C) and Fahrenheit (°F).
- Automatically re-fetches data when unit changes.
 
4. Dynamic Weather Card
- Displays temperature, feels-like, humidity, wind speed, and condition icon.
- Clean Apple Weather–style layout.
 
5. Error Handling
- Handles invalid city names, denied location permissions, API errors, and network issues.
 
6. Loading State & Welcome Screen
- Nicely designed loading indicators and welcome prompt before searches.
5. System Architecture
React handles UI rendering while Vite manages the build pipeline.
The app follows a modular architecture:
 
- UI components are isolated.
- API logic is centralized in: src/lib/weather.ts
- Styles are managed globally via Tailwind and custom utility classes.
 
Data Flow:
1. User inputs a city OR clicks "Use my location".
2. React triggers API call in weather.ts.
3. WeatherCard receives normalized data.
4. UI updates dynamically.
6. Project Folder Structure
weatherbuddy/
│
├── index.html
├── .env                  	→ Contains API key
├── postcss.config.js
├── tailwind.config.js
├── vite.config.ts
│
├── src/
│   ├── styles/
│   │   └── global.css   	→ Tailwind imports + custom design classes
│   │
│   ├── pages/
│   │   └── Home.tsx     	→ Main page layout + logic
│   │
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── LocationButton.tsx
│   │   ├── WeatherCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── WelcomeState.tsx
│   │
│   ├── lib/
│   │   └── weather.ts   	→ API logic (fetchByCity, fetchByCoords)
│   │
│   └── App.tsx          	→ Routes + main wrapper
│
└── package.json
7. OpenWeatherMap API Integration
API Endpoints Used:
- City Search:
https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={KEY}&units={UNITS}
 
- Coordinate Search:
https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={KEY}&units={UNITS}
 
Environment Variable:
Stored as:
VITE_OWM_API_KEY=your_api_key_here
 
Imported using:
const KEY = import.meta.env.VITE_OWM_API_KEY;
8. HTML5 Geolocation Integration
Navigator API:
navigator.geolocation.getCurrentPosition()
 
WeatherBuddy uses this to fetch:
- latitude
- longitude
 
This ensures accurate real-time weather based on user’s physical location.
9. UI & Design System
 
Key design elements include:
- Radial gradient “night sky” background.
- Glassmorphism cards with blur + transparency.
- Soft shadows and rounded panels.
- Responsive layout for mobile & desktop.
- Apple Weather–inspired typography hierarchy.
 
Custom CSS defined under:
src/styles/global.css
10. Setup Instructions
1. Install dependencies:
npm install
 
2. Add .env file:
VITE_OWM_API_KEY=YOUR_KEY_HERE
 
3. Run development server:
npm run dev
 
4. Open browser:
http://localhost:5173/
11. Challenges Faced
- Tailwind v4 plugin errors requiring downgrade to Tailwind v3.
- Handling incorrect API keys and OpenWeatherMap activation delay.
- Designing custom glassmorphism in Tailwind using @layer components.
- Normalizing API responses for consistent rendering.
12. Future Enhancements
- Hourly forecast timeline (like Apple Weather).
- 7-day or 10-day forecast cards.
- Weather radar / map integration.
- Background animations based on real conditions (rain, sun, night).
- Recent search history.
- Offline mode using service workers.
13. Conclusion
WeatherBuddy successfully demonstrates the integration of modern web technologies, real-time API consumption,
geolocation capabilities, and responsive UI/UX design. It is a strong portfolio project showcasing skills in
React development, frontend architecture, API handling, Tailwind UI, and modern web styling techniques.

