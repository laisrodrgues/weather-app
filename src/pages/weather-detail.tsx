import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./weather-detail.sass"; import { BsArrowLeft } from 'react-icons/bs';


import { Weather } from '../models/weather.model';

import WeatherIcon from '../components/weather-icon';

async function loadWeatherData(cityName: string): Promise<Weather> {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&key=c248ec182f9744b594c45058241505`);
    const weatherData: Weather = await response.json();
    return weatherData;
}

function getTimeOfDayLabel(time: string): string {
    switch (time) {
        case "03:00":
            return "dawn";
        case "09:00":
            return "morning";
        case "15:00":
            return "afternoon";
        case "21:00":
            return "night";
        default:
            return "";
    }
}

function getThemeColors(condition: number | undefined, isLink: boolean): string {
    let classes = "";

    switch (condition) {
        case 1000: {
            classes += "white-labels";

            if (!isLink) {
                classes += " cleary-sky";
            }
            break;
        };
        case 1003: case 1006: case 1009: {
            classes += "white-labels";

            if (!isLink) {
                classes += " few-clouds";
            }
            break;
        };
        case 1030: case 1063: case 1069: case 1087: case 1150: case 1153: case 1180: case 1183: case 1204: case 1207: case 1240: case 1243: case 1246: {
            classes += "white-labels";

            if (!isLink) {
                classes += " few-clouds";
            }
            break;
        };;
        case 1072: case 1114: case 1117: case 1168: case 1171: case 1186: case 1189: case 1192: case 1195: {
            classes += "dark-labels";

            if (!isLink) {
                classes += " few-snow";
            }
            break;
        };;
        case 1087: case 1150: case 1153: case 1180: case 1183: case 1204: case 1207: case 1240: case 1243: case 1246: {
            classes += "white-labels";

            if (!isLink) {
                classes += " few-clouds";
            }
            break;
        };
        case 1198: case 1201: case 1273: case 1276: case 1279: {
            classes += "white-labels";

            if (!isLink) {
                classes += " few-clouds";
            }
            break;
        };;
        case 1135: case 1147: {
            classes += "white-labels";

            if (!isLink) {
                classes += " few-clouds";
            }
            break;
        };;
        case 1066: case 1069: case 1192: case 1195: {
            classes += "dark-labels";

            if (!isLink) {
                classes += " few-snow";
            }
            break;
        };;
        default:
            classes += "white-labels";

            if (!isLink) {
                classes += " cleary-sky";
            }
            break;
    }

    if (!isLink) {
        classes += " weather-app";
    }

    return classes
}

function WeatherDetail() {
    const { cityName } = useParams();
    const [weatherData, setWeatherData] = useState<Weather | null>(null);


    useEffect(() => {
        if (cityName) {
            loadWeatherData(cityName).then(setWeatherData);
        }
    }, [cityName]);

    return (
        <div className={getThemeColors(weatherData?.current.condition.code, false)}>
            <a href="/" className={"back-link " + getThemeColors(weatherData?.current.condition.code, true)}><BsArrowLeft /></a>

            <div className="weather-header">
                <h1>{weatherData?.location.name.toUpperCase()}</h1>
                <p>{weatherData?.current.condition.text.toLowerCase()}</p>
            </div>
            <div className='weather-main'>
                <div className="weather-temp">
                    <h2>
                        {Math.trunc(weatherData?.current.temp_c || 0)}
                    </h2>
                    <div className="temp-range">
                        <span className="temp-unit">°C</span>
                        <div className='temp'>
                            <span className="temp-arrow">↑</span>
                            <span>{weatherData?.forecast.forecastday[0].day.maxtemp_c}°</span>
                        </div>
                        <div className='temp'>
                            <span className="temp-arrow">↓</span>
                            <span>{weatherData?.forecast.forecastday[0].day.mintemp_c}°</span>
                        </div>

                    </div>
                </div>

            </div>
            <div className="weather-icon">
                <WeatherIcon code={weatherData?.current.condition.code} />
            </div>

            <div className="weather-forecasts">
                <div className="forecast-container">
                    {weatherData?.forecast.forecastday.map((forecast) => {
                        return forecast.hour.filter((hour) => {
                            return ["03:00", "09:00", "15:00", "21:00"].includes(hour.time.split(" ")[1]);
                        }).map((hour) => (
                            <div className="forecast-item">
                                <p>{getTimeOfDayLabel(hour.time.split(" ")[1])}</p>
                                <div className='forecast-icon'>
                                    <WeatherIcon code={hour.condition.code} />
                                </div>
                                <p>{hour.temp_c}°C</p>
                            </div>
                        ));
                    })}
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <p>Wind Speed</p>
                    <span>{weatherData?.current.wind_mph} m/s</span>
                </div>
                <div className="separator"></div>
                <div className="detail-item">
                    <p>Sunrise</p>
                    <span>{weatherData?.forecast.forecastday[0].astro.sunrise}</span>
                </div>
                <div className="separator"></div>
                <div className="detail-item">
                    <p>Sunset</p>
                    <span>{weatherData?.forecast.forecastday[0].astro.sunset}</span>
                </div>
                <div className="separator"></div>
                <div className="detail-item">
                    <p>Humidity</p>
                    <span>{weatherData?.current.humidity}%</span>
                </div>
            </div>
        </div>
    );
}

export default WeatherDetail;
