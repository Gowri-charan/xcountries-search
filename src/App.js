import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(searchValue));
    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <div className="search-container">
        <input type="text" placeholder="Search for a country..." onChange={handleSearch} />
      </div>
      <div className="countries-container">
        {filteredCountries.map(country => (
          <div key={country.cca3} className="countryCard">
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;