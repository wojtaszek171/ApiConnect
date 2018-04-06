import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import ReactHtmlParser from 'react-html-parser';

class Wiki extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            lang: 'pl',
            res: [],
            index: null,
            showDetails: false,
            title: '',
            content: ''
        };
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.SelectHandler = this.SelectHandler.bind(this);
        this.WikiContent = this.WikiContent.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.readMore = this.readMore.bind(this);
    }

    componentDidMount() {

    }
    setIndex(e){
        this.setState({index: e.target.value});
    }
    readMore(){
        this.setState({showDetails: true});
    }

    WikiContent(){
        if(this.state.showDetails===true){
            var self = this;
            var response="";
            if(self.state.title==='') {
                $.ajax({
                    url: "https://" + this.state.lang + ".wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + this.state.res[1][this.state.index] + "&rvprop=content",
                    dataType: 'jsonp',
                    success: function (data) {
                        //console.log(data);
                        response = data;
                        for (var k in response.query.pages) {
                            if (response.query.pages[k].revisions !== "") {
                                self.setState({title: response.query.pages[k].title});
                                self.setState({content: response.query.pages[k].extract});
                            }
                            //console.log(k, response.query.pages[k]);

                        }
                    }
                }).done(function (response) {
                    //console.log(response);
                });
            }
            return(<div id="wikiPage" style={{ textAlign: "left" }}>
                    <h3>{this.state.title}</h3>
                        {ReactHtmlParser(this.state.content)}
                </div>
            );
        }else
        if(this.state.index!=null){
            console.log("test");
            return (<div id="wikiPage">
                {this.state.res[1].map((object, i) => <button value={i} onClick={this.setIndex}>{object}</button>)}
                <h3>{this.state.res[1][this.state.index]}</h3>
                <div id="wikicontent">
                    {this.state.res[2][this.state.index]}
                    <button details="true" onClick={this.readMore}>more..</button>
                </div>

            </div>);
        }else
        if(this.state.res[1]!=null) {
            return (<div id="wikiPage">
                {this.state.res[1].map((object, i) => <button value={i} onClick={this.setIndex}>{object}</button>)}
                <h3></h3>

            </div>);
        }
    }
    getResult(){
        var searchFor = this.state.text;
        var response="";
        //console.log(searchFor);
        var self = this;
        $.ajax({
            url: "https://"+this.state.lang+".wikipedia.org/w/api.php?action=opensearch&prop=revisions&search="+searchFor+"&limit=5",
            dataType: 'jsonp',
            success: function(data){
                //console.log(data);
                response=data;
                self.setState({res: data, index: null, showDetails: false, title: ''});
            }
        }).done(function(response) {
            //console.log(response);
        });
    }
    SubmitHandler(e) {
        if(e.keyCode===13){
            this.getResult();
        }
        this.setState({text : e.target.value});
    }

    SelectHandler() {
        this.setState({lang : $('select[name=selector]').val()});
    }

    render() {
        return (
            <div className="calc">
                <h2>Wikipedia API</h2>

                <p>Input:</p>
                <select name="selector" id="selector" onChange={this.SelectHandler} onSelect={this.SelectHandler}>
                    <option value="pl" defaultChecked>pl</option>
                    <option value="en">en</option>
                </select>
                <input type="text" name="text" onKeyDown={this.SubmitHandler} onChange={this.SubmitHandler}/>
                <button onClick={this.getResult.bind(this)}>Szukaj</button>
                <p id="result"></p>
                {this.WikiContent()}
                <h2 id="wiki_title"></h2>
                <p id="wiki_content"></p>
            </div>
        );
    }



}

export default Wiki;
