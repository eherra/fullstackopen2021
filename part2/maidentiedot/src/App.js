import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([]) 
  const [allCountries, setAllCountries] = useState([]) 


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleShowClick = (country) => {
    setCountriesToShow([country])
  }

  const handleFilterChange = (event) => {
    setCountriesToShow(allCountries.filter(country => country['name'].common.toLowerCase().includes(event.target.value.toLowerCase())))
    setNewFilter(event.target.value)
  }
 
  return (
    <div>
      <Filter value={newFilter} handleChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} handleClick={handleShowClick}/>
    </div>
    
  )
}

export default App