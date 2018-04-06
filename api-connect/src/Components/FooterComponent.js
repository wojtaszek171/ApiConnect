import React, { Component } from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import 'jquery-ui-dist/jquery-ui';
import Calc from './Calc.js';
import Wiki from './Wiki.js';
import GMap from './Map.js';


class FooterComponent extends Component {

    render() {
        return (
            <div className="footer navbar-inverse">
                <div >
                    © 2018 Copyright: Paweł Wojtaszko
                </div>
            </div>
        );
    }
}

export default FooterComponent;
