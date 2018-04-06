import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

class Calc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equation: ''
        };
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }

    componentDidMount() {

    }
    getResult(){
        $.post('https://www.calcatraz.com/calculator/api?c=%20'+encodeURIComponent(this.state.equation), function(data) {
            document.getElementById('result').innerHTML = data;
        });
    }
    SubmitHandler(e) {
      if(e.keyCode===13){
        this.getResult();
      }
        this.setState({equation : e.target.value});
    }

  render() {
    return (
      <div className="calc">
          <h2>Calcatraz API</h2>  (PROBLEMS WITH CORS) <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi">chrome extension</a> needed

            <p>Input equation</p>
            <input type="text" name="equation" onKeyDown={this.SubmitHandler} onChange={this.SubmitHandler}/>
            <button onClick={this.getResult.bind(this)}>Count</button>
        <p>Wynik =  <p id="result"></p> </p>
      </div>
    );
  }


}

export default Calc;
