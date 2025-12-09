import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/details/:cityName" element={<Details />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;