import { createContext, useEffect, useState } from "react";
import Dashboard from "~/dashboard/Dashboard";
import ForeCastList from "~/forecastlist/ForeCastList";
import ForeCastListMb from "~/forecastlist_mb/ForeCastListMb";
import SearchBox from "~/searchbox/SearchBox";
import { ToastContainer, toast } from 'react-toastify';

export interface WeatherData {
  date: string;
  mintemp_c: number;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  avghumidity: number;
  totalprecip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
}

interface UserContextType {
  weather: WeatherData[];
  currentIndex: number;
  cityDetail: CityDetailType | undefined;
}
interface CityDetailType {
  country: string,
  region: string,
  name: string
}
export const UserContext = createContext<UserContextType | null>(null);

const API_KEY = "372cba9c49614ea684f143631252802";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cityDetail, setCityDetail] = useState<CityDetailType>();
  const [showCelsius, setShowCelsius] = useState(true);
  const [city, setCity] = useState('');

  const getWeatherDetail = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
      );
      if (!response.ok) {
        toast.error('Failed to fetch weather data');
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();

      console.log("Raw API data:", data);
      const currentCityData: CityDetailType = {
        country: data.location.country,
        region: data.location.region,
        name: data.location.name,
      };

      setCityDetail(currentCityData);

      const filteredData = data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        mintemp_c: day.day.mintemp_c,
        maxtemp_c: day.day.maxtemp_c,
        maxtemp_f: day.day.maxtemp_f,
        mintemp_f: day.day.mintemp_f,
        avgtemp_c: day.day.avgtemp_c,
        avgtemp_f: day.day.avgtemp_f,
        maxwind_mph: day.day.maxwind_mph,
        maxwind_kph: day.day.maxwind_kph,
        avghumidity: day.day.avghumidity,
        totalprecip_mm: day.day.totalprecip_mm,
        condition: {
          text: day.day.condition.text,
          icon: day.day.condition.icon,
        },
      }));

      setWeather(filteredData);
    } catch (err) {
      toast.error('Invalid City');
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      getWeatherDetail("Coimbatore");
    } catch (error) {
      console.error("Error in initial data fetch:", error);
    }
  }, []);

  useEffect(() => {
    try {
      getWeatherDetail(city);
    } catch (error) {
      console.error("Error fetching new city data:", error);
    }
  }, [city]);

  if (loading || weather.length === 0) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="h-screen">
      <ToastContainer />
      <UserContext.Provider value={{ currentIndex, weather, cityDetail }}>
        <div className="flex  w-full">
          <div className="md:w-4/6 w-full bg-green-300 h-full">
            <SearchBox setCity={setCity} />
            <Dashboard showCelsius={showCelsius} setShowCelsius={setShowCelsius} />
          </div>
          <div className="md:w-2/6 hidden md:block">
            <ForeCastList setCurrentIndex={setCurrentIndex} showCelsius={showCelsius} />
          </div>
          <div className="md:hidden fixed bottom-0 right-0 bg-white shadow-md">
            <ForeCastListMb setCurrentIndex={setCurrentIndex} showCelsius={showCelsius} />
          </div>
        </div>
      </UserContext.Provider>
    </div>
  );
}
