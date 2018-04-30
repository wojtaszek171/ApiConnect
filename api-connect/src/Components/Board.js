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
    }
    componentWillReceiveProps(newProps){
        this.setState({
            matrix : newProps.newMatrix
        });
        console.log("updateBoard");

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
