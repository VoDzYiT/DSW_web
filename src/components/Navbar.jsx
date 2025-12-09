import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../store/settingsSlice';

const Navbar = () => {
    const unit = useSelector((state) => state.settings.unit);
    const dispatch = useDispatch();

    const handleUnitToggle = () => {
        const newUnit = unit === 'metric' ? 'imperial' : 'metric';
        dispatch(toggleUnit(newUnit));
    };

    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#333',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
                <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>Favorites</Link>
            </div>

            <button onClick={handleUnitToggle} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                Units: {unit === 'metric' ? '°C' : '°F'}
            </button>
        </nav>
    );
};

export default Navbar;