import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_KEY = '0be29478ee5b9547c446a128d4facba4';

export const useCurrentWeather = (city) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const unit = useSelector((state) => state.settings.unit);

    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
                );
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city, unit]);

    return { data, loading, error };
};