// utils/getOutfitRecommendation.tsx
import React from "react";
import { FaUmbrella, FaTshirt, FaSun, FaCloud, FaBolt, FaSnowflake, FaSmog } from "react-icons/fa";

export interface OutfitRecommendation {
  text: string;
  icon: React.ReactNode;
  color: string;
}

export function getOutfitRecommendation(weather: any): OutfitRecommendation {
  if (!weather) return { text: "", icon: null, color: "" };

  const code = weather.code ? Number(weather.code) : null;
  const condition = weather.condition?.toLowerCase() || "";

  // Thunderstorm (2xx)
  if ((code && code >= 200 && code < 300) || condition.includes("thunderstorm")) {
    return {
      text: "Stay indoors if possible!",
      icon: <FaBolt className="w-4 h-4" />,
      color: "text-purple-600",
    };
  }

  // Drizzle (3xx)
  if ((code && code >= 300 && code < 400) || condition.includes("drizzle")) {
    return {
      text: "Light raincoat recommended.",
      icon: <FaUmbrella className="w-4 h-4" />,
      color: "text-blue-400",
    };
  }

  // Rain (5xx)
  if ((code && code >= 500 && code < 600) || condition.includes("rain")) {
    return {
      text: "Take an umbrella!",
      icon: <FaUmbrella className="w-4 h-4" />,
      color: "text-blue-500",
    };
  }

  // Snow (6xx)
  if ((code && code >= 600 && code < 700) || condition.includes("snow")) {
    return {
      text: "Bundle up warm!",
      icon: <FaSnowflake className="w-4 h-4" />,
      color: "text-cyan-500",
    };
  }

  // Atmosphere (7xx)
  if ((code && code >= 700 && code < 800) || ["mist", "smoke", "haze", "dust", "fog", "sand", "ash", "squall", "tornado"].some(word => condition.includes(word))) {
    return {
      text: "Visibility is low, drive carefully.",
      icon: <FaSmog className="w-4 h-4" />,
      color: "text-gray-500",
    };
  }

  // Clear (800)
  if ((code && code === 800) || condition.includes("clear")) {
    return {
      text: "Sunglasses suggested!",
      icon: <FaSun className="w-4 h-4" />,
      color: "text-yellow-500",
    };
  }

  // Clouds (80x)
  if ((code && code > 800 && code < 900) || condition.includes("cloud")) {
    return {
      text: "Light layers are good.",
      icon: <FaCloud className="w-4 h-4" />,
      color: "text-gray-400",
    };
  }

  // Default
  return {
    text: "Dress comfortably!",
    icon: <FaTshirt className="w-4 h-4" />,
    color: "text-green-500",
  };
}