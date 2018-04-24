import React, { Component } from 'react';
import $ from 'jquery';
import chuck from '../services/chuck';

var loader = require('./ajaxloader.gif');
class Chuck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            category: 'all',
            text: '',
            paginator : false
        };
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.returnAllJokes = this.returnAllJokes.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.getData = this.getData.bind(this);
        this.getResult = this.getResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }
    getData(){
        return this.state.data;
    }
    handleChange(e){
        this.setState({category:e.target.value});
    }
    getResult = async () =>{
        this.setState({page : 0, data :[]});
        var searchFor = this.state.text;

        var self = this;
        try {
            $('#loading-image').show();
            const datas = await chuck(searchFor);
            var filtered = [];
                var e = document.getElementById('categories');
                if(this.state.category!=='all'){
                    for (var i=0; i<datas.result.length; i++){
                        if(datas.result[i]['category'] != null) {
                            if(datas.result[i]['category'][0] === this.state.category)
                                filtered.push(datas.result[i]);
                        }
                    }
                }else{
                    filtered = datas.result;
                }
            self.setState({data : filtered});
            console.log(self.state.data);

        }catch (e) {
            console.log(e);
        }

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
            if (self.state.paginator===true) {
                return (
                    <div>
                        <p><div style={{'height':'100%'}}><img src={data[0]['icon_url']} alt='chucknorris'/></div> {data[self.state.page]['value']} </p>
                        <div id='navigator'>
                            {this.state.page>0 ? <button  id='prev' className='form-control' onClick={function () {self.setState({page : self.state.page - 1});}}> PREV </button> : <button id='prev' disabled className='form-control' onClick={function () {self.setState({page : self.state.page - 1});}}> PREV </button>}
                            <span>{this.state.page+1}/{data.length}</span>
                            {this.state.page<data.length -1 ? <button id='next' className='form-control' onClick={function () {self.setState({page : self.state.page + 1});}}> NEXT </button> : <button id='next' disabled className='form-control' onClick={function () {self.setState({page : self.state.page + 1});}}> NEXT </button>}
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
                <select className='form-control' id='categories' value={this.state.category} onChange={this.handleChange} >
                    {this.getCategories()}
                </select>
                <input id="searchinput" placeholder="search" className="form-control" type="text" name="text" onKeyDown={this.SubmitHandler} onChange={this.SubmitHandler}/>
                <button id="search" className="btn btn-default" onClick={this.getResult.bind(this)}>Search</button><button className="btn btn-default" onClick={this.getRandom}>Random</button>
                <div><input type='checkbox' className='' onChange={event => {this.setState({page : 0}); if(this.state.paginator===true){this.setState({paginator : false});}else{this.setState({paginator : true});}}} id='paginator'/><label className='' htmlFor="paginator">Enable
                    paginator</label></div>
                <p id="result">
                    <img id='loading-image' hidden src={loader}/>
                {this.returnAllJokes()}
                </p>
            </div>
        );
    }


    getCategories() {
        var length = $('#categories').children('option').length;
        if(length==0) {
            var self = this;
            var categories = [];
            $.ajax({
                url: "https://api.chucknorris.io/jokes/categories",
                dataType: 'json',
                success: function (data) {
                    //console.log(data);
                    categories = data;
                    $('#categories').append($('<option>', {
                        value: 'all',
                        text: 'all'
                    }));
                    return (
                        categories.map(value => {
                            $('#categories').append($('<option>', {
                                value: value,
                                text: value
                            }));
                        })
                    )
                }
            }).done(function (response) {

            });
        }
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
                self.setState({ page: 0, data : array});
            }
        }).done(function(response) {

        });
    }
}

export default Chuck;
