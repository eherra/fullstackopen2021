import React from 'react'
import Country from './Country'

const Countries = ({countriesToShow, handleClick}) => {
    return (
        <div>
            {(countriesToShow.length > 10 || countriesToShow.length === 0) &&
            <p>Too many matches, specify another filter </p>}

            {countriesToShow.length <= 10 && countriesToShow.length > 1 &&
            countriesToShow.map(country => 
                <div key={country.name.common}>
                    <p key={country.name.common}>{country.name.common} <button key={country.name.common} onClick={() => handleClick(country)}>show</button></p>
                </div>
            )} 

            {countriesToShow.length === 1 &&
                <Country country={countriesToShow[0]} />
            } 
        </div>
    )
  }

export default Countries