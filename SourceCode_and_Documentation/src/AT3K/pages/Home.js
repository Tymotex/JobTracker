import React from 'react';
import {
    Link
} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li>
                    <Link to="/dashboard">Go to the dashboard</Link>
                </li>
                <li>
                    Register
                </li>
                <li>
                    Login
                </li>
            </ul>
        </div>
    );
};

export default Home;
