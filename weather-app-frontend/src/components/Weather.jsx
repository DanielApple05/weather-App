import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = () => {
  const [city, setCity] = useState("Lagos");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [unit, setUnit] = useState(false);
  const [input, setInput] = useState("");
  const [day, setDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0)

  useEffect(() => {
    if (!city) return
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )
        setWeatherData(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchWeather()
  }, [city])

  const search = (e) => {
    e.preventDefault();
    if (input.trim()) setCity(input)
  }

  const current = weatherData?.list[0]
  const daily = weatherData?.list.filter(entry => entry.dt_txt.includes("12:00:00"))
  const getDayName = (dt_txt) => {
    const date = new Date(dt_txt)
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }
  const hourly = weatherData?.list.filter(entry =>
    entry.dt_txt.startsWith(daily[selectedDay]?.dt_txt.split(" ")[0])
  )

  return (
    <div>
      <div className=' bg-[#050620] text-gray-300 xl:px-20 px-5 xl:py-10 py-5 min-h-screen '>
        <div className='flex justify-between relative'>
          <img src='/images/logo.svg' alt="" className='xl:w-40 w-30' />
          <button className='flex items-center justify-center bg-[#2F2D52] p-2 rounded-lg gap-2 cursor-pointer' onClick={() => setUnit(!unit)} >
            <img src="/images/icon-units.svg" alt="" />
            <p>
              Units
            </p>
            <img src="/images/icon-dropdown.svg" alt="" />
          </button>
        </div >
        {
          unit &&
          <div className='absolute right-0'>
            hello
          </div>
        }
        <div className='flex flex-col items-center justify-center gap-10 xl:mt-0 mt-10 xl:pl-20 pl-0'>
          <h1 className='xl:text-[35px] text-[20px]'>
            How's the sky looking today?
          </h1>
          <form onSubmit={search} className=' flex gap-3 xl:w-7/12 w-full'>
            <div className='flex bg-[#2F2D52] items-center p-3 rounded-lg flex-1  '>
              <img src="/images/icon-search.svg" alt="" className='w-5 ' />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='outline-none pl-2' placeholder='Search for a place...' />
            </div>
            <button type='submit' className='p-3 bg-[#030578] rounded-lg'>
              Search
            </button>
          </form>
        </div>
        <div className='xl:flex flex-col-2 mt-10 justify-between gap-5  '>
          <div className=' gap-5 flex flex-col flex-1 '>
            <div className='flex justify-between items-center p-8 rounded-2xl min-h-60 bg-cover bg-no-repeat bg-center bg-[url(/images/bg-today-large.svg)]'>
              <div>
                <p>{weatherData?.city.name}, <span>{weatherData?.city.country}</span></p>
                <p>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
              </div>
              <div className='flex items-center'>
                <img src={`https://openweathermap.org/img/wn/${current?.weather[0].icon}@2x.png`} alt="" />
                <p>{Math.round(current?.main.temp)}°C</p>
              </div>
            </div>
            <div className='xl:flex grid grid-cols-2 justify-between gap-5'>
              <div className='grid bg-[#2F2D52] w-full p-5 rounded-lg gap-2 '>
                <span> Feels Like</span>
                <span>{Math.round(current?.main.feels_like)}°C</span>
              </div>
              <div className='grid bg-[#2F2D52] w-full p-5 rounded-lg gap-2'>
                <span> Humidity</span>
                <span>{current?.main.humidity}%</span>
              </div>
              <div className='grid bg-[#2F2D52] w-full p-5 rounded-lg gap-2 '>
                <span> Wind</span>
                <span>{current?.wind.speed} m/s</span>
              </div>
              <div className='grid bg-[#2F2D52] w-full p-5 rounded-lg gap-2 '>
                <span> precipitation</span>
                <span>{current?.rain?.["3h"] ?? 0} mm</span>
              </div>
            </div>
            <div className='space-y-5 mb-5'>
              <p>Daily forecast</p>
              <div className='xl:flex grid grid-cols-2 flex-1 gap-3'>
                {daily?.map((day, index) => (
                  <div key={index} className='bg-[#2F2D52] p-3 rounded-lg text-center'>
                    <p>{day.dt_txt.split(" ")[0]}</p>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
                    <p>{Math.round(day.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='xl:w-3/12 w-full flex flex-col bg-[#2F2D52] rounded-lg relative'>
            <div className='flex justify-between p-5 items-center '>
              <p className='text-start'>Hourly forecast</p>
              <button className='flex p-2 items-center bg-[#3B3966] rounded-lg gap-2' onClick={() => setDay(!day)}>
                <p>Days</p>
                <img src="/images/icon-dropdown.svg" alt="" />
              </button>
            </div>
            {hourly?.map((hour, index) => (
              <div key={index} className='flex justify-between items-center p-3 border-b border-[#3B3966]'>
                <p>{hour.dt_txt.split(" ")[1].slice(0, 5)}</p>
                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="" className='w-8' />
                <p>{Math.round(hour.main.temp)}°C</p>
              </div>
            ))}
            <div className='flex gap-2 p-3'>
              { day && daily?.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`p-2 rounded-lg text-sm ${selectedDay === index ? 'bg-[#030578]' : 'bg-[#3B3966]'}`}
                >
                  {getDayName(day.dt_txt).slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
