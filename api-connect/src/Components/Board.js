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
    componentWillMount(){
        window.addEventListener('keydown', this._handleKeyDown, false);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyDown, false);
    }
    componentDidMount() {
        this.setState({matrix : this.props.newMatrix});
        this.renderMatrix = this.renderMatrix.bind(this);
    }
    componentWillReceiveProps(newProps){
        this.setState({
            matrix : newProps.newMatrix
        });
        console.log("updateBoard");
    }

    _handleKeyDown(event){
        //console.log(event.keyCode);
        switch( event.keyCode ) {
            case 37:
                console.log("LEFT");
                break;
            case 38:
                console.log("UP");
                break;
            case 39:
                console.log("RIGHT");
                break;
            case 40:
                console.log("DOWN");
                break;
            default:
                break;
    }
    }



    renderMatrix(){
        console.log("rematrix");
        console.log(this.state.matrix);
        var matrix = this.state.matrix;
        var result = "<table style='text-align: center;'>";
            for(var i=0; i<matrix.length; i++){
                result += "<tr>";
                var array = matrix[i];
                for(var j=0; j< matrix[i].length; j++){
                    result += "<td style='width: 30px; height: 30px; line-height: 30px; text-align: center'>"+matrix[i][j]+"</td>";
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
            <div className="matrix-view" style={{ width: '120px' , margin: 'auto'}}>
                <h3>Matrix</h3>
                <table className="matrix">{this.renderMatrix()}</table>

            </div>
        );
    }


}

export default Board;
