import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from '../components/WeatherCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const favorites = useSelector((state) => state.settings.favorites);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>My Favorite Cities</h1>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                    <h3>No favorites yet</h3>
                    <p>Go to the Home page and click the star icon on any city to save it here</p>
                    <Link to="/" style={{ color: '#007bff', fontWeight: 'bold' }}>Go to Home</Link>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    marginTop: '30px'
                }}>
                    {favorites.map((city) => (
                        <WeatherCard key={city} cityName={city} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;