import React, { Component } from 'react';
import $ from 'jquery';
import ReactHtmlParser from "react-html-parser";

import './css/board.css';

const TableRow = ({row}) => (
    row.map(item => {
            <td >{item}</td>
    })
);

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points : 0,
            moves : 0,
            matrix : [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        };
    }

    componentDidMount() {
        this.setState({matrix : this.props.newMatrix});
        this.renderMatrix = this.renderMatrix.bind(this);
        $(document).on("pagecreate","#page1",function() {
            $('#board').on('swipedown', function () {
                alert("swipedown..");
            });
            $('#board').on('swipeup', function () {
                alert("swipeup..");
            });
            $(window).on('swipeleft', function () {
                alert("swipeup..");
            });
        });

    }
    componentWillReceiveProps(newProps){
        this.setState({
            matrix : newProps.newMatrix
        });
        //console.log("updateBoard");
    }





    renderMatrix(){
        //console.log("rematrix");
        //console.log(this.state.matrix);
        var matrix = this.state.matrix;
        var result = "<table style='text-align: center;'>";
            for(var i=0; i<matrix.length; i++){
                result += "<tr>";
                var array = matrix[i];
                for(var j=0; j< matrix[i].length; j++){
                    var color = "#ffffff";
                    var text = "#ffffff"
                    var element;
                    if(matrix[i][j]===0)
                        element = '';
                    else {
                        element = matrix[i][j];
                        switch (element){
                            case 2 :
                                text = '#000000';
                                color = '#eee4da';
                                break;
                            case 4:
                                color = '#ece0c8';
                                text = '#000000';
                                break;
                            case 8:
                                color = '#f0b079';
                                break;
                            case 16:
                                color = '#ed8c51';
                                break;
                            case 32:
                                color = '#f57c5f';
                                break;
                            case 64:
                                color = '#e95937';
                                break;
                            case 128:
                                color = '#f2d86a';
                                break;
                            case 256:
                                color = '#f9d067';
                                break;
                            case 512:
                                color = '#e4c02a';
                                break;
                            case 1024:
                                color = '#e2b814';
                                break;
                            case 2048:
                                color = '#ecc400';
                                break;
                            case 4096:
                                color = '#60d992';
                                break;
                        }
                    }
                    result += "<td style='width: 70px; height: 70px; line-height: 68px; font-weight: bold; text-align: center; color:"+text+"; background-color: "+color+"'>"+element+"</td>";

                }
                result += "</tr>"
            }
            result += "</table>";
        return(
            ReactHtmlParser(result)
        );

    }



    render() {
        return (
            <div id="board" className="matrix-view" style={{ width: '280px' , margin: 'auto', cursor:'pointer'}}>
                <h3>Matrix</h3>
                <table className="matrix">{this.renderMatrix()}</table>
            </div>
        );
    }


}

export default Board;

