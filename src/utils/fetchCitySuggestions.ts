// utils/fetchCitySuggestions.ts

import { api_geo_openweathermap } from "../api/axiosInstance";

export interface CitySuggestion {
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon: number;
}

export const fetchCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
    console.log("data", query)

    if (!query) return [];

    const apiKey = import.meta.env.VITE_OPEN_WEATHER_APP_ID;

    const { data } = await api_geo_openweathermap.get(
        `/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
    );
    console.log(data)
    return data;
};