import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';

const Home = () => {
    const [cities, setCities] = useState(() => {
        const savedCities = localStorage.getItem('myWeatherCities');
        return savedCities ? JSON.parse(savedCities) : ['Wroclaw', 'Kyiv', 'London', 'Paris', 'New York'];
    });

    const [input, setInput] = useState('');

    useEffect(() => {
        localStorage.setItem('myWeatherCities', JSON.stringify(cities));
    }, [cities]);

    const addCity = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setCities([input.trim(), ...cities]);
            setInput('');
        }
    };

    const removeCity = (cityToRemove) => {
        setCities(cities.filter(city => city !== cityToRemove));
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Weather App</h1>

            <form onSubmit={addCity} style={{ marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Type city name..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Add City
                </button>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {cities.map((city) => (
                    <div key={city} style={{ position: 'relative' }}>
                        <button
                            onClick={() => removeCity(city)}
                            style={{
                                position: 'absolute', top: '-10px', right: '-10px',
                                background: 'red', color: 'white', border: 'none', borderRadius: '50%',
                                width: '25px', height: '25px', cursor: 'pointer', zIndex: 10,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            ✕
                        </button>
                        <WeatherCard cityName={city} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;