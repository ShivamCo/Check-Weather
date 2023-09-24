
import React, { useState, useEffect } from "react";
import axios from "axios";



function App() {
  // Defining Search Bar
  const [searchInput, setSearchInput] = useState();
  const [inputName, setInputName] = useState("Mumbai");
  const [city, setCity] = useState("Delhi")



  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [weatherImg, setWeatherImg] = useState();
  const [temp_c, setTemp_c] = useState();
  const [last_updated, setLast_Updated] = useState();
  const [aqi, setAqi] = useState();
  const [condition, setCondition] = useState();

  const API = "3f27834ec3e54e22b6e123910232108";



  function getInput(event) {

    setSearchInput(event.target.value)

  }


  function searchLocation() {
    setInputName(searchInput)
    setCity(city)



  }


  useEffect(() => {
    const finalURL = `http://api.weatherapi.com/v1/current.json?key=3f27834ec3e54e22b6e123910232108&q=${inputName}&aqi=yes`
    axios.get(finalURL).
      then((response) => {
        setWeather(response.data.location.region);
        setLocation(response.data.location.region + ", " + response.data.location.country)
        setWeatherImg(response.data.current.condition.icon);
        setTemp_c(response.data.current.temp_c);
        setLast_Updated(response.data.location.localtime);
        setAqi(response.data.current.air_quality.pm10);
        setCondition(response.data.current.condition.text)
      }).
      catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          // client never received a response, or request never left 
        } else {
          // anything else 
        }
      })


  }, [inputName])



  return (
    <div className=" grid justify-center " >
      <div className=" text-center grid place-content-center ">
        <nav className="h-14 w-full drop-shadow-md bg-orange-50 justify-items-center items-center grid ">
          <img className="h-10  decoration-cyan-300 " src={require("./wLogo.png")} />
        </nav>
        <h1 className="font-bold text-2xl sm:text-4xl text-cyan-400 m-5 h-auto drop-shadow-sm ">Todays Weather</h1>

        <div className=" ml-3 mr-3 grid grid-cols-3 gap-x-2 gap-y-2 bg-cyan-400  p-5 rounded-lg text-center border-cyan-500 drop-shadow-md border-opacity-60 border-2 " >
          <div className="grid place-items-center">
            {(weather) ? <img src={weatherImg}></img> : <p className="text-white text-2xl font-semibold">Nil</p>}
          </div>


          {/* location Add */}
          {(location)
            ? <div className="grid place-items-center text-white text-md md:text-2xl font-semibold">
              {location}
            </div>
            : <p className="text-white text-2xl font-semibold">Nil</p>}


          {/* Add Temp */}
          {
            (temp_c) ? <div className="grid place-items-center">
              <h4 className="text-white text-2xl font-semibold">{temp_c}<sup> °c</sup></h4>
            </div>
              : <p className="text-white text-2xl font-semibold">Nil</p>


          }

          {/* Add Date & Time */}

          {(last_updated) ? <div className=" text-cyan-50 text-sm font-bold">
            {last_updated}
            {/* {(last_updated) ? {last_updated} : <p className="text-white text-2xl font-semibold">Nil</p>} */}
          </div>

            : <p className="text-white text-2xl font-semibold">Nil</p>}



          {/* Add AQI */}

          {(aqi)
            ? <div className=" text-cyan-50 text-sm font-bold">
              AQI: {aqi}
            </div>
            : <p className="text-cyan-50 text-2xl font-semibold">Nil</p>

          }

          {(condition)
            ? <div className=" text-cyan-50 text-sm font-bold max-w-sm">
              {condition}
            </div>
            : <p className="text-white text-2xl font-semibold">Nil</p>

          }


        </div>


        {/* <Weathercard City={inputName} /> */}
        <form>
          <div className="mb-5  p-2">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch drop-shadow-lg">
              <input
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-cyan-500 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                placeholder="Location"
                aria-label="Search"
                value={searchInput}
                onChange={getInput}
                aria-describedby="button-addon3" />


              <button
                className="relative z-[2] rounded-r border-2  bg-cyan-400 text-white font-bold border-cyan-500 border-opacity-50 border-primary px-6 py-2 text-xs uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-20 focus:outline-none focus:ring-0"
                type="button"
                id="button-addon3"
                onClick={searchLocation}
                data-te-ripple-init>
                Search
              </button>
            </div>
          </div>
        </form>

      </div>



      <footer className="  p-2 bg-cyan-600 fixed bottom-0 inset-x-0" >

        <div className="flex items-center justify-center align-middle">
          <p className=" text-white " >
            Powered by:
          </p>

          <img className="h-10 ml-5" src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png" />
        </div>
        <p className=" text-white " >GitHub:</p>
      </footer>
    </div>
  )


}


export default App;