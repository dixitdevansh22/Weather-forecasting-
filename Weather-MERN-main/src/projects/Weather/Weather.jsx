import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'dotenv/config';
import Navbar from '../../components/Navbar';
import './Weather.css';

/* ** 
LOCATION input from search-bar ->
Append LOCATION to URL as 'location' query ->
Trigger page RELOAD after above step ->
Fetch LOCATION from URL after page reload ->
Call fetchData() function to fetch weather report from an API ->
Set weatherData with fetched data ->
Display weatherData with JSX.
** */

function Weather() {
  /*** HOOKS ***/
  const [weatherData, setWeatherData] = useState(null); //to store weather data
  const [time, setTime] = useState(0); //to store current time
  const [input, setInput] = useState(''); //to store user input
  const [location, setLocation] = useState(''); //location used to fetch data
  const [breakText, setBreakText] = useState('Loading...'); //text shown between searches

  const navigate = useNavigate();
  const locat = useLocation();

  
  //fetching location value from URL
  useEffect(() => {
    let searchParam = new URLSearchParams(locat.search);
    let queryLocation = searchParam.get('location');
    if (queryLocation) setLocation(queryLocation);
  }, []);
  
  //api re-call on location change
  useEffect(() => {
    if (location !== '') fetchData();
  }, [location]);
  
  //automating element updates
  useEffect(() => {
    console.log('honollul');
    setBreakText('Enter Location');

    //automatically updating time every 1000 second
    const timeUpdateID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // automatically updating weather report every minute
    const weatherUpdateID = setInterval(() => {
      if (location !== '') fetchData();
    }, 120000);

    //interval cleanup 
    return () => {
      clearInterval(timeUpdateID);
      clearInterval(weatherUpdateID);
    };
  }, []);




  /*** FUNCTIONS ***/
  async function fetchData() {
    console.log('called');
    console.log(`called with ${location}`);
    navigate(`?location=${location}`);
    setBreakText('Loading...');

    try {
      let geoResponse = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=process.env.GEOCODE_API_KEY`);
      let geoData = await geoResponse.json();

      if (geoData.length === 0) {
        locationPOST(location, false);
        setBreakText('Invalid Location');
        return;
      }
      else {
        const latitude = geoData[0].lat;
        const longitude = geoData[0].lon;

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=OPENWEATHER_API_KEY`);
        let data = await response.json();
        data.sys.sunrise = decodeUNIX(data.sys.sunrise);
        data.sys.sunset = decodeUNIX(data.sys.sunset);
        setWeatherData(data);
        locationPOST(location, true);
      }
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  //converting UNIX timestamp to readable time
  function decodeUNIX(unixTimestamp) {
    let milliseconds = unixTimestamp * 1000;
    let dateObject = new Date(milliseconds);
    let hours24 = dateObject.getHours();
    let hours12 = hours24 % 12 || 12;
    let hours = String(hours12).padStart(2, '0');
    let period = hours24 >= 12 ? 'PM' : 'AM';
    let minutes = String(dateObject.getMinutes()).padStart(2, '0');
    let formattedTime = `${hours}:${minutes} ${period}`;

    return formattedTime;
  }

  function handleChange(event) {
    setInput(event.target.value);
  }
  function locationSearch() {
    if (input !== '') {
      navigate(`?location=${input}`);
      window.location.reload();
    }
  }
  function handleEnter() {
    if (event.key === 'Enter') locationSearch();
  }

  //posting data to server
  async function locationPOST(location, isSuccess) {
    let postData = {
      location,
      isSuccess,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    try {
      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
    }
    catch (error) {
      console.log(error);
    }
  }




  /*** JSX Content ***/
  return (
    <>
      <Navbar />
      <div className="weather-container">

        {/* entering location */}
        <div className="location">
          <input type='text' value={input} id='location-input' placeholder='Enter location' onChange={handleChange} onKeyDown={handleEnter} />
          <button id="location-search-button" onClick={locationSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <div id="search-text">Search</div>
          </button>
        </div>
        <div id='results-for'>
          {location ? (<>Showing results for '{location}'</>) : (<></>)}
        </div>

        {/* checking if weather data is available */}
        {weatherData ? (
          <div className='weather'>
            <h1>Weather Report | <i className="fa-solid fa-sun" style={{ color: 'yellow' }}></i></h1>
            <h2>{weatherData.name}, {weatherData.sys.country} | {weatherData.weather[0].main}</h2>
            <h4>{new Date().toLocaleDateString()} {time}</h4>
            <br /><hr /><br />
            {/* weather statistics */}
            <div className="stat-list">
              <div className='stat temperature'>
                <div className='stat-title'>Temperature</div>
                {(weatherData.main.temp - 273.15).toFixed(2)}°C
              </div>
              <div className='stat feels-like'>
                <div className='stat-title'>Feels Like</div>
                {(weatherData.main.feels_like - 273.15).toFixed(2)}°C
              </div>
              <div className='stat humidity'>
                <div className='stat-title'>Humidity</div>
                {weatherData.main.humidity}%
              </div>
              <div className='stat windspeed'>
                <div className='stat-title'>Wind Speed</div>
                {weatherData.wind.speed} Km/h
              </div>
              <div className='stat cloudiness'>
                <div className='stat-title'>Cloudiness</div>
                {weatherData.clouds.all}%
              </div>
              <div className='stat visibility'>
                <div className='stat-title'>Visibility</div>
                {weatherData.visibility / 1000} Km
              </div>
              <div className='stat timezone'>
                <div className='stat-title'>Timezone</div>
                UTC+({weatherData.timezone / 3600}Hrs)
              </div>
              <div className='stat sunrise'>
                <div className='stat-title'>Sunrise</div>
                {weatherData.sys.sunrise}
              </div>
              <div className='stat sunset'>
                <div className='stat-title'>Sunset</div>
                {weatherData.sys.sunset}
              </div>
            </div>
          </div>
        ) : (
          <div className='break-text'>
            {breakText === 'Enter Location' && <div><i id='enter-location-icon' className="fa-solid fa-location-dot"></i>{breakText}</div>}
            {breakText === 'Loading...' && <><div id="loading-icon"></div>{breakText}</>}
            {breakText === 'Invalid Location' && <><i id='invalid-icon' className="fa-solid fa-xmark"></i>{breakText}</>}
          </div>
        )}

      </div>



    </>
  );
}

export default Weather;



/* on calling this function, the below location is outputting previous value but location in jsx(if present) is outputting latest value */
// console.log(`${input} ${location}`);
