import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div><h3 style={{color: 'blue'}}>Thanks for using React-Webpack-Bootstrap-Boilerplate!</h3>
                Please click on the menu button to go to the User Management portion of this project!
            </div>
        );
    }
}

