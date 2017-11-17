import React from 'react';
import Navigation from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';
// import { Link } from 'react-router-dom';
// import { footer } from '../styles/footer.scss';
import Routes from '../routes';

const App = () =>
    <div>
    <Navigation />
        { Routes }
    </div>;

export default App;
