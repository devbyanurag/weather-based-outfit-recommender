// utils/fetchWeatherForCity.ts

import { api_openweathermap } from "../api/axiosInstance";

export interface WeatherData {
    city: string;
    temperature: number;
    condition: string;
    windSpeed: number;
    humidity: number;
    visibility: number;
    icon: string; 
}

export const fetchWeatherForCity = async (
    cityName: string,
    lat: number,
    lon: number
): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_APP_ID;
    const res = await api_openweathermap.get(
        `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const data = res.data;
    console.log(data)
    return {
        city: cityName,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        visibility: Math.round(data.visibility / 1000),
        icon: data.weather[0].icon, // <-- add this
    };
};