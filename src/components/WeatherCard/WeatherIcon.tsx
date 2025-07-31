
import React from "react";
import { BASE_URL_OPENWEATHERMAP_ICON } from "../../utils/constants";


interface WeatherIconProps {
  iconCode: string; 
  alt?: string;
  size?: number; // px
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  alt = "Weather icon",
  size = 64,
  className = "",
}) => {

  const iconSrc = `${BASE_URL_OPENWEATHERMAP_ICON}/img/wn/${iconCode}@2x.png`;

  return (
    <img
      src={iconSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      draggable={false}
    />
  );
};

export default WeatherIcon;