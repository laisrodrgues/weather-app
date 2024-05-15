import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import WeatherDetail from "./pages/weather-detail"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="detail/:cityName/:countryCode" element={<WeatherDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
