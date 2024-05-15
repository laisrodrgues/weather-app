import React from 'react';
import './home.sass';
import { Outlet, Link } from "react-router-dom";

function Home() {
    const cities = [
        { name: 'Dallol', country: 'NG' },
        { name: 'Fairbanks', country: 'US' },
        { name: 'Londres', country: 'GB' },
        { name: 'Recife', country: 'BR' },
        { name: 'Vancouver', country: 'CA' },
        { name: 'Yakutsk', country: 'RU' },
    ];
    return (
        <div className='app'>
            <div className='container'>
                <div className='main-text'>
                    <h1>WEATHER</h1>
                    <p>select a city</p>
                </div>
                <div className='globe-container'>
                    <img src="mundo.png" height="120px" />
                </div>
                <div className='cities'>
                    {cities.map((city, index) => (
                        <div key={index}>
                            <a href={`/detail/${city.name}/${city.country}`}>
                                {city.name} ({city.country})
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
