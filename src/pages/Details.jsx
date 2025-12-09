import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForecast } from '../hooks/useForecast';

const Details = () => {
    const { cityName } = useParams();
    const { data, loading, error } = useForecast(cityName);

    const dailyForecast = useMemo(() => {
        if (!data) return [];
        return data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
    }, [data]);

    if (loading) return <div style={{padding:'20px'}}>Loading...</div>;
    if (error) return <div style={{padding:'20px'}}>Error</div>;
    if (!data) return null;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>Back</Link>

            <h1>{data.city.name} - 5 Days Forecast</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {dailyForecast.map((day) => (
                    <div key={day.dt} style={{
                        border: '1px solid #eee', padding: '15px', borderRadius: '10px',
                        flex: '1', minWidth: '150px', background: '#f9f9f9'
                    }}>
\                        <h3>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</h3>

                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icon" width="50" />
                        <h2>{Math.round(day.main.temp)}°</h2>
                        <p>{day.weather[0].description}</p>

                        <div style={{ fontSize: '14px', color: '#555', marginTop: '10px' }}>
                            <p>Rain: {Math.round(day.pop * 100)}%</p>
                            <p>Wind: {day.wind.speed} m/s</p>
                            <p>Clouds: {day.clouds.all}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Details;