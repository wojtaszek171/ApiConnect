import React, { Component } from 'react';
import './App.css';
import 'jquery-ui-dist/jquery-ui';
import NavComponent from './Components/NavComponent.js';
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
