# Weather API Client

This project provides a simple client for accessing weather data using the [OpenWeather One Call API 3.0](https://openweathermap.org/api/one-call-3).

## Features
- Current weather conditions  
- Daily forecasts  
- Weather alerts 

## Requirements
- An [OpenWeather API key](https://home.openweathermap.org/api_keys)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/msKaleb/weather_app.git
   cd weather_app
2. Install dependencies:
    ```bash
    pnpm install
3. Create a `.env.local` file in the project root and add your API key:
    ```.env.local
    OPENWEATHER_API_KEY=your_api_key_here
4. Run the development server:
    ```bash
    pnpm run dev
5. Or create a production build:
    ```bash
    pnpm run build
    pnpm start