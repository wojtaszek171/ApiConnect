import React, { Component } from 'react';

import './css/Nav.css'


class Main extends Component {

    componentDidMount(){

    }
    render() {
        return (
            <div className="jumbotron">
                <h1>Hello, world!</h1>
                <p>My task is to read the API. My code is on GitHub. Click the button to view.</p>
                <p><a className="btn btn-primary btn-lg" href="https://github.com/wojtaszek171/ApiConnect" role="button">Code</a></p>
            </div>
        );
    }
}

export default Main;
