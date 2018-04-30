import React, { Component } from 'react';
import $ from 'jquery';
import chuck from '../services/chuck';
import Board from "./Board";

var loader = require('./ajaxloader.gif');

var probability = Array(2,2,2,2,2,2,2,2,2,4);

class DragDrop2048 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points : 0,
            moves : 0,
            matrix : [
                [2, 0, 0,  0],
                [0, 0, 0,  0],
                [0, 0, 16, 0],
                [0, 0, 0,  32]
            ]
        };

        this.newGame = this.newGame.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }
    componentWillMount(){
        window.addEventListener('keydown', this._handleKeyDown, false);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyDown, false);
    }


    componentDidMount() {
        $("#board").draggable();
    }

    renderBoard(){
        //console.log("rerender");
        return(
            <Board newMatrix={this.state.matrix}/>
        );

    }

    _handleKeyDown(event){
        //console.log(event.keyCode);
        var key = event.keyCode;
        if( key == 37 || key == 38 || key == 39 || key == 40 ) {
            var matrix = this.state.matrix;
            switch (event.keyCode) {
                case 37:
                    console.log("LEFT");
                    var newMatrix = this.swipeElements('L', matrix);
                    break;
                case 38:
                    console.log("UP");
                    var newMatrix = this.swipeElements('U', this.state.matrix);
                    break;
                case 39:
                    console.log("RIGHT");
                    var newMatrix = this.swipeElements('R', this.state.matrix);
                    break;
                case 40:
                    console.log("DOWN");
                    var newMatrix = this.swipeElements('D', this.state.matrix);
                    break;
                default:
                    break;
            }
                this.setState({matrix: newMatrix});
            DragDrop2048.randomize();
        }
    }

    static randomize(){
        const rand = Math.floor(Math.random() * 16);
        //console.log(rand);
        var item = probability[Math.floor(Math.random()*probability.length)];
        //console.log("Item : "+ item);
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
                <h2>Drag/Drop 2048 GAME</h2>
                {this.renderBoard()}
                <button onClick={this.newGame}>New Game</button>
            </div>
        );
    }


    swipeElements(direction,matrix) {
        var newMatrix;
        switch (direction){
            case 'L':
                for(var i=0; i<matrix.length; i++){
                    if(matrix[i].every(element => element === 0)){
                    } else {
                        var count=0;
                        while (count<4) {
                            count++;
                            for(var j=0; j< matrix[i].length; j++){
                                if(matrix[i][j+1] !=null)
                                    if (matrix[i][j] === 0 && matrix[i][j + 1] !== 0) {
                                        var element = matrix[i][j];
                                        matrix[i][j] = matrix[i][j + 1];
                                        matrix[i][j + 1] = element;
                                }
                            }
                        }
                    }
                }
                newMatrix=matrix;
                break;
            case 'U':
                for(var j=0;j<matrix.length;j++){
                    if(matrix[0][j]===0 && matrix[1][j]===0 && matrix[2][j]===0 && matrix[3][j]===0){
                    }else {
                        var count=0;
                            while (count<4) {
                                count++;
                                for (var i = 0; i < matrix.length - 1; i++) {
                                    if (matrix[i + 1][j] != null)
                                        if (matrix[i][j] === 0 && matrix[i + 1][j] !== 0) {
                                            var element = matrix[i][j];
                                            matrix[i][j] = matrix[i + 1][j];
                                            matrix[i + 1][j] = element;
                                        }
                                }
                            }
                    }
                }
                newMatrix=matrix;
                break;
            case 'R':
                for(var i=0; i<matrix.length; i++){
                    if(matrix[i].every(element => element === 0)){
                    } else {
                        var count=0;
                        while (count<4) {
                            count++;
                            for (var j = matrix[i].length - 1; j >= 0; j--) {
                                if (matrix[i][j - 1] != null)
                                    if (matrix[i][j] === 0 && matrix[i][j - 1] !== 0) {
                                        var element = matrix[i][j];
                                        matrix[i][j] = matrix[i][j - 1];
                                        matrix[i][j - 1] = element;

                                    }
                            }
                        }
                    }
                }
                newMatrix=matrix;
                break;
            case 'D':
                for(var j=0;j<matrix.length;j++){
                    if(matrix[0][j]===0 && matrix[1][j]===0 && matrix[2][j]===0 && matrix[3][j]===0){
                    }else {
                        var count=0;
                        while (count<4) {
                            count++;
                            for (var i = matrix.length - 1; i >= 1; i--) {
                                if (matrix[i - 1][j] != null)
                                    if (matrix[i][j] === 0 && matrix[i - 1][j] !== 0) {
                                        var element = matrix[i][j];
                                        matrix[i][j] = matrix[i - 1][j];
                                        matrix[i - 1][j] = element;
                                    }
                            }
                        }
                    }
                }
                newMatrix=matrix;
                break;
            default:
                break;
        }
        return newMatrix;
    }
}

export default DragDrop2048;
