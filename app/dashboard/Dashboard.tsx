import { useContext, useState } from "react";
import { UserContext } from "~/routes/home";
import { WiHumidity, WiThermometer, WiStrongWind, WiDayCloudy, WiRain } from "react-icons/wi";
import WeatherDetail from "~/weatherdetail.tsx/WeatherDetail";
interface DashboardType{
    setShowCelsius: (value: boolean) => void;
    showCelsius:boolean
  }
const Dashboard = ({showCelsius,setShowCelsius}:DashboardType) => {
    const context = useContext(UserContext);
    // const [showCelsius, setShowCelsius] = useState(true);

    if (!context) {
        return <p>Loading context...</p>;
    }

    const { weather, currentIndex, cityDetail } = context;

    if (!weather || weather.length === 0) {
        return <p>Loading weather data...</p>;
    }

    const currentWeather = weather[currentIndex];

    return (
        <div className="md:p-8 p-2 text-white   w-full flex flex-col ">
            <div className="flex justify-between items-center">
                <div>
                    {currentWeather ? (
                        <div>
                            {cityDetail && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-3xl font-bold">{cityDetail.name}</p>
                                    <div className="flex gap-2">
                                        <p>{cityDetail.region},</p>
                                        <p>{cityDetail.country}</p>
                                    </div>
                                    <p className="text-xl">
                                        {showCelsius ? `${currentWeather.avgtemp_c} °C` : `${currentWeather.avgtemp_f} °F`}
                                    </p>
                                    <div
                                        className="relative w-16 h-8 bg-gray-300 rounded-full flex items-center cursor-pointer"
                                        onClick={() => setShowCelsius(!showCelsius)}
                                    >
                                        <div
                                            className={`absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${showCelsius ? 'translate-x-1' : 'translate-x-8'}`}
                                        />
                                        <span className="absolute left-2 text-xs text-black">°C</span>
                                        <span className="absolute right-2 text-xs text-black">°F</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <img src={currentWeather.condition.icon} alt="Weather Icon" width={200} />
            </div>
            <div>
           <WeatherDetail/>

            </div>
        </div>
    );
};

export default Dashboard;
