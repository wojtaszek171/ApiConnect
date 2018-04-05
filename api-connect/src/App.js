import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import './App.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import Calc from './Components/Calc.js';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import NavComponent from './Components/NavComponent.js'
class App extends Component {
  handleSelect(eventKey) {
    //event.preventDefault();
    //alert(`selected ${eventKey}`);
  }
  render() {
    return (
      <div className="App">
            <content>
            <NavComponent/>
            </content>
      </div>
    );
  }
}

export default App;
