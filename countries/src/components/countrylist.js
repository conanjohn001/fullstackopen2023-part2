import {useState, useEffect} from "react"
import axios from "axios"


const CountryFound =({country})=>{
  const [weather, setWeather] = useState(null)
  const languages = Object.values(country.languages)

  useEffect(()=>{
    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    axios.get(url).then(( {data} )=>{
      setWeather(data)
    })
  }, [])

  if (!weather) {
    return null
  }
  const icon = weather.weather[0].icon
  const weatherIconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`  

  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>population {country.population}</p>
      <p>capital {country.capital[0]}</p>

      <h3>Languages</h3>
      <ul>
        {languages.map(lan => 
          <li key={lan}>
            {lan} 
          </li>)}
      </ul>

      <img src={country.flags.png} width='200' />

      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} Celsius</p>

      <img src={weatherIconURL} width='100' />
      <p>wind {weather.wind.speed} m/s </p>

    </div>
  )
}

const CountryList =({matchedCountries, showCountry})=>{
  if (matchedCountries.length >10) {
    return(
      <div>
        Too many matches, be more specific
      </div>
    );
  }

  if (matchedCountries.length ===1) {
    return <CountryFound country={matchedCountries[0]} />
  }

  return(
    <div>
      {matchedCountries.map(c => 
        <p key={c.fifa} >
          {c.name.common}
          <button onClick={()=> showCountry(c.name.common)} >
            show
          </button>
        </p>
      )}
    </div>
  );
}

export default CountryList