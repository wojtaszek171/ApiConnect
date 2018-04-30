import React, { Component } from 'react';
import $ from 'jquery';
import chuck from '../services/chuck';
import Board from "./Board";

var loader = require('./ajaxloader.gif');
class DragDrop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points : 0,
            moves : 0,
            matrix : [
                [3, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        };

        this.newGame = this.newGame.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
    }

    componentDidMount() {
    }

    renderBoard(){
        console.log("rerender");
        return(
            <Board newMatrix={this.state.matrix}/>
        );

    }

    newGame(){
        this.setState({
                matrix : [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
        });
    }

    render() {
        return (
            <div className="drag">
                <h2>Drag/Drop</h2>
                {this.renderBoard()}
                <button onClick={this.newGame}>New Game</button>
            </div>
        );
    }


}

export default DragDrop;
