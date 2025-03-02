
import { useContext, useEffect } from "react";
import { UserContext } from "~/routes/home";
interface ForeCastListType {
    setCurrentIndex: (index: number) => void;
    showCelsius: boolean
}
const ForeCastList = ({ setCurrentIndex, showCelsius }: ForeCastListType) => {
    const context = useContext(UserContext);

    if (!context) {
        return <p>Loading context...</p>;
    }

    const { weather } = context;

    useEffect(() => {
        console.log("Dashboard received weather:", weather);
    }, [weather]);

    if (!weather || weather.length === 0) {
        return <p>Loading weather data...</p>;
    }


    const changeDay = (index: number) => {
        setCurrentIndex(index);

    };



    return (
        <div className=" bg-blue-700 w-full p-5 h-full text-white md:border-l-2 ">
            <h2>7-DAY FORECAST</h2>
            {
                weather.map((data, index) => {
                    return (
                        <div key={index} className={`grid grid-cols-4  cursor-pointer items-center w-full  ${index == 0 ? '' : ' border-t'}`} onClick={() => changeDay(index)} >
                            <p className="text-sm">{data.date.slice(5)}</p>
                            <div className="flex gap-2 items-center col-span-2 text-sm justify-center">
                                <img src={data.condition.icon} alt="Weather Icon" />
                                <p className="text-nowrap hidden md:block">{data.condition.text.split(" ").slice(0, 2).join(" ")}</p>
                            </div>
                            <div className="text-nowrap">
                                {showCelsius ? (
                                    <>
                                        <span className="md:hidden">{data.avgtemp_c} °C</span>
                                        <p className="hidden md:block "><span className="font-semibold"> {data.maxtemp_c}</span> / {data.mintemp_c} °C</p>
                                    </>
                                ) : (
                                    <>
                                        <span className="md:hidden">{data.avgtemp_f} °F</span>
                                        <p className="hidden md:block "><span className="font-semibold"> {data.maxtemp_f}</span> / {data.mintemp_f} °F</p>

                                    </>
                                )}
                            </div>


                        </div>

                    )
                })
            }
        </div>
    );
};

export default ForeCastList;
