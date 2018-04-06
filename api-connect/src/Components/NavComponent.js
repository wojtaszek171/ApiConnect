import React, { Component } from 'react';
import {Route, BrowserRouter, NavLink} from "react-router-dom";
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery';
import Calc from './Calc.js';
import Wiki from './Wiki.js';
import GMap from './Map.js';
import Main from './Main.js'
import './css/Nav.css'

import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class NavComponent extends Component {

    componentDidMount(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
        $(".navbar-header a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
        });
    }
  render() {
    return (
      <div>
                  <BrowserRouter>
                            <div>
                                <nav className="navbar navbar-default navbar-inverse">
                                    <div className="container-fluid">

                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed"
                                                    data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                                                    aria-expanded="false">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                            <NavLink to="/"><a className="navbar-brand" href="#">API</a></NavLink>
                                        </div>

                                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                            <ul className="nav navbar-nav">
                                                <li><NavLink to="/calc"><a href="#">Calcatraz API</a></NavLink></li>
                                                <li><NavLink to="/wiki"><a href="#">Wikipedia API</a></NavLink></li>
                                                <li><NavLink to="/google-map"><a href="#">Google Maps API</a></NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                              <div className="content">
                                <Route exact path="/" component={Main}/>
                                <Route path="/calc" component={Calc}/>
                                  <Route path="/wiki" component={Wiki}/>
                                  <Route path="/google-map" component={GMap}/>
                              </div>
                            </div>
                  </BrowserRouter>
      </div>
    );
  }
}

export default NavComponent;
