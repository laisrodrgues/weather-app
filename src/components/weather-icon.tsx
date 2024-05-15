import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiWindy, } from 'react-icons/wi';

function WeatherIcon({ code }: { code: number | undefined }) {
    switch (code) {
        case 1000: return <WiDaySunny />;
        case 1003: case 1006: case 1009: return <WiCloudy />;
        case 1030: case 1063: case 1069: case 1087: case 1150: case 1153: case 1180: case 1183: case 1204: case 1207: case 1240: case 1243: case 1246: return <WiRain />;
        case 1072: case 1114: case 1117: case 1168: case 1171: case 1186: case 1189: case 1192: case 1195: return <WiSnow />;
        case 1087: case 1150: case 1153: case 1180: case 1183: case 1204: case 1207: case 1240: case 1243: case 1246: return <WiRain />;
        case 1198: case 1201: case 1273: case 1276: case 1279: return <WiThunderstorm />;
        case 1135: case 1147: return <WiFog />;
        case 1066: case 1069: case 1192: case 1195: return <WiSnow />;
        default:
            return <WiDaySunny />;
    }
}

export default WeatherIcon;