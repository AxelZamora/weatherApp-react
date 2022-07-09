import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState(' ')
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=77d3ddcc73ca435b5f7bbcd634045b07&lang=sp
  `

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      }).catch((error) => {
        setData('no se encontro ubicacion')
      })
      setLocation('')
    }

  }
  useEffect(() => {
    setLocation('')
  }, [])

  return (
    <div className="App">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Ingresa la ciudad' autoFocus
          onKeyPress={searchLocation}
          type="text" />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <h2>{data.name}</h2>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : data}
          </div>
          <div className='description'>
            {data.weather ? <h2>{data.weather[0].description}</h2> : null}

          </div>
        </div>


        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>sensación</p>

            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>humedad</p>
            </ div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} km/H</p> : null}
              <p>viento</p>
            </div>
          </div>

        }
      </div>
    </div>
  );
}

export default App;
