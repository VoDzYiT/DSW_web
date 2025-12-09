import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/settingsSlice';

const WeatherCard = ({ cityName }) => {
    const { data, loading, error } = useCurrentWeather(cityName);

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.settings.favorites);

    const isFavorite = favorites.includes(cityName);

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        dispatch(toggleFavorite(cityName));
    };

    const cardStyle = {
        position: 'relative',
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        width: '220px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        transition: 'transform 0.2s'
    };

    if (loading) return <div style={cardStyle}>Loading...</div>;
    if (error) return <div style={cardStyle}>Error: {error}</div>;
    if (!data) return null;

    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    return (
        <div style={cardStyle}>
            <button
                onClick={handleToggleFavorite}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0'
                }}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                <Star
                    size={24}
                    color={isFavorite ? "#FFD700" : "#ccc"}
                    fill={isFavorite ? "#FFD700" : "none"}
                />
            </button>

            <h3>{data.name}, {data.sys.country}</h3>
            <img src={iconUrl} alt={data.weather[0].description} />
            <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{Math.round(data.main.temp)}°</h2>
            <p style={{ textTransform: 'capitalize', color: '#555' }}>{data.weather[0].description}</p>

            <Link
                to={`/details/${cityName}`}
                style={{
                    display: 'inline-block',
                    marginTop: '15px',
                    textDecoration: 'none',
                    color: '#007bff',
                    fontWeight: 'bold',
                    border: '1px solid #007bff',
                    padding: '8px 16px',
                    borderRadius: '20px'
                }}
            >
                View Details
            </Link>
        </div>
    );
};

export default WeatherCard;