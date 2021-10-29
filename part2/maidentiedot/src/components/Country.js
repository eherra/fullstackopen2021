import React from 'react'

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => 
                <li key={language}>{language}</li>
            )} 
            </ul>
            <img src={country.flags.png} alt='flag'  height='150' width='230'/>.
        </div>
    )
  }

export default Country