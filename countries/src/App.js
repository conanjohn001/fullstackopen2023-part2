import { useState, useEffect} from 'react'
import axios from "axios"
import CountryList from './components/countrylist'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const matchedCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <div className="App">
      <p> find country </p>
      <input value={search} onChange={(e)=> setSearch(e.target.value)} />

    <CountryList
      matchedCountries={matchedCountries}
      showCountry={setSearch}
    />
    </div>
  );
}

export default App;
