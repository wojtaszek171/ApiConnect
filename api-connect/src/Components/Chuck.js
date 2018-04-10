import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import ReactHtmlParser from 'react-html-parser';
var loader = require('./ajaxloader.gif');

class Chuck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            category: ''
        };

        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.returnAllJokes = this.returnAllJokes.bind(this);
        this.getRandom = this.getRandom.bind(this);
    }

    componentDidMount() {

    }

    getResult(){
        this.setState({page : 0, data :[]});
        var searchFor = this.state.text;
        //console.log(searchFor);
        var self = this;
        $('#loading-image').show();
        $.ajax({
            url: "https://api.chucknorris.io/jokes/search?query="+searchFor,
            dataType: 'json',
            success: function(data){
                var filtered = [];
                //console.log(data.result);
                var e = document.getElementById('categories');
                if(e.options[e.selectedIndex].value!='all'){
                    for (var i=0; i<data.result.length; i++){
                        if(data.result[i]['category'] != null) {
                            if(data.result[i]['category'][0] === e.options[e.selectedIndex].value)
                             filtered.push(data.result[i]);
                            //console.log(data.result[i]['category'][0])
                        }
                    }
                }else{
                    filtered = data.result;
                }
                self.setState({data : filtered});
                //console.log(filtered);
            },
            complete: function () {
                $('#loading-image').hide();
            }
        }).done(function(response) {

        });
    }

    SubmitHandler(e) {
        if(e.keyCode===13){
            this.getResult();
        }
        this.setState({text : e.target.value});
    }

    returnAllJokes(){
        var data = this.state.data;
        var self = this;
        if(data.length>0) {
            if (document.getElementById('paginator').checked) {
                return (
                    <div>
                        <p><div style={{'height':'100%'}}><img src={data[0]['icon_url']} alt='chuck'/></div> {data[self.state.page]['value']} </p>
                        <div id='navigator'>
                            {this.state.page>0 ? <button className='form-control' onClick={function () {self.setState({page : self.state.page - 1});}}> PREV </button> : <button disabled className='form-control' onClick={function () {self.setState({page : self.state.page - 1});}}> PREV </button>}
                            <span>{this.state.page+1}/{data.length}</span>
                            {this.state.page<data.length -1 ? <button className='form-control' onClick={function () {self.setState({page : self.state.page + 1});}}> NEXT </button> : <button disabled className='form-control' onClick={function () {self.setState({page : self.state.page + 1});}}> NEXT </button>}
                        </div>
                    </div>
                );
            } else {
                return (
                    data.map(value => {
                        return (<p ><div style={{'height':'100%'}}><img src={value['icon_url']}
                                                                                                      alt='chuck'/></div> {value['value']}</p>);
                    })
                );
            }
        }
    }


    render() {
        return (
            <div className="calc">

                <h2>Chuck Norris API</h2>

                <p>Search for jokes:</p>
                <select className='form-control' id='categories'>
                    {this.getCategories()}
                </select>
                <input placeholder="search" className="form-control" type="text" name="text" onKeyDown={this.SubmitHandler} onChange={this.SubmitHandler}/>
                <button className="btn btn-default" onClick={this.getResult.bind(this)}>Search</button><button className="btn btn-default" onClick={this.getRandom}>Random</button>
                <div><input type='checkbox' className='' onChange={event => {this.setState({page : 0})}} id='paginator'/><label className='' htmlFor="paginator">Enable
                    paginator</label></div>
                <p id="result">
                    <img id='loading-image' hidden src={loader}/>
                {this.returnAllJokes()}
                </p>
            </div>
        );
    }


    getCategories() {
        var self = this;
        var categories = [];
        $.ajax({
            url: "https://api.chucknorris.io/jokes/categories",
            dataType: 'json',
            success: function(data){
                //console.log(data);
                categories = data;
                $('#categories').append($('<option>', {
                    value: 'all',
                    text: 'all'
                }));
                return(
                    categories.map(value => {
                        $('#categories').append($('<option>', {
                            value: value,
                            text: value
                        }));
                    })
                )
            }
        }).done(function(response) {

        });

    }

    getRandom() {
        var self = this;
        var categories = [];
        $.ajax({
            url: "https://api.chucknorris.io/jokes/random",
            dataType: 'json',
            success: function(data){
                //console.log(data);
                var array = [];
                array.push(data);
                self.setState({data : array});
            }
        }).done(function(response) {

        });
    }
}

export default Chuck;
