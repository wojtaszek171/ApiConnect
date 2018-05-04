import React, { Component } from 'react';
import $ from 'jquery';
import chuck from '../services/chuck';
import Board from "./Board";
import SwipeReact from 'swipe-react';

var loader = require('./ajaxloader.gif');

var probability = Array(2,2,2,2,2,2,2,2,2,4);



class DragDrop2048 extends Component {

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
        SwipeReact.config({
            left: () => {
                var e = $.Event("keydown");
                e.keyCode = 37;
                this._handleKeyDown(e);
            },
            right: () => {
                var e = $.Event("keydown");
                e.keyCode = 39;
                this._handleKeyDown(e);
            },
            up: () => {
                var e = $.Event("keydown");
                e.keyCode = 38;
                this._handleKeyDown(e);
            },
            down: () => {
                var e = $.Event("keydown");
                e.keyCode = 40;
                this._handleKeyDown(e);
            }
        });

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
            <Board  newMatrix={this.state.matrix}/>
        );

    }

    async _handleKeyDown(event){
        var matrix1 = this.state.matrix.toString();

        var key = event.keyCode;
        if( key == 37 || key == 38 || key == 39 || key == 40 ) {
            var newMatrix = [];
            var matrix = this.state.matrix;
            switch (event.keyCode) {
                case 37:
                    //console.log("LEFT");
                    newMatrix = this.swipeElements('L',matrix);
                    for(var i=0; i<newMatrix.length; i++) {
                        for (var j = 0; j < newMatrix[i].length; j++) {
                            if (newMatrix[i][j] === newMatrix[i][j + 1]) {
                                newMatrix[i][j] *= 2;
                                newMatrix[i][j + 1] = 0;
                                await this.setState({points : this.state.points + newMatrix[i][j]});
                            }
                        }
                    }
                    newMatrix = this.swipeElements('L', newMatrix);
                    break;
                case 38:
                    //console.log("UP");
                    newMatrix = this.swipeElements('U',matrix);
                    for(var i=0; i<newMatrix.length; i++) {
                        for (var j = 0; j < newMatrix[i].length-1; j++) {
                            if (newMatrix[j][i] === newMatrix[j+1][i]) {
                                newMatrix[j][i] *= 2;
                                newMatrix[j+1][i] = 0;
                                await this.setState({points : this.state.points + newMatrix[j][i]});
                            }
                        }
                    }
                    newMatrix = this.swipeElements('U', newMatrix);
                    break;
                case 39:
                    //console.log("RIGHT");
                    newMatrix = this.swipeElements('R',matrix);
                    for(var i=0; i<newMatrix.length; i++) {
                        for (var j = matrix[i].length - 1; j >= 0; j--) {
                            if (newMatrix[i][j] === newMatrix[i][j - 1]) {
                                newMatrix[i][j] *= 2;
                                newMatrix[i][j - 1] = 0;
                                await this.setState({points : this.state.points + newMatrix[i][j]});
                            }
                        }
                    }
                    newMatrix = this.swipeElements('R', newMatrix);
                    break;
                case 40:
                    //console.log("DOWN");
                    newMatrix = this.swipeElements('D',matrix);
                    for(var i=0; i<newMatrix.length; i++) {
                        for (var j = matrix[i].length - 1; j >= 1; j--) {
                            if (newMatrix[j][i] === newMatrix[j-1][i]) {
                                newMatrix[j][i] *= 2;
                                newMatrix[j-1][i] = 0;
                                await this.setState({points : this.state.points + newMatrix[j][i]});
                            }
                        }
                    }
                    newMatrix = this.swipeElements('D', newMatrix);
                    break;
                default:
                    break;
            }
            //console.log(newMatrix.toString());

            if(matrix1 === newMatrix.toString()){

            }else {
                this.setState({matrix: newMatrix});
                var matrixWithRandom = DragDrop2048.randomize(this.state.matrix);
                if (matrixWithRandom != undefined) {
                    this.setState({matrix: matrixWithRandom});
                }
            }

        }
    }

    static randomize(matrix){
        var emptyCells = [];
        var count = 0;
        for(var i=0; i<matrix.length; i++){
            for(var j=0; j<matrix.length; j++){
                if(matrix[i][j]===0)
                    emptyCells.push(count);
                count++;
            }
        }
        if(emptyCells.length>0) {
            //console.log(emptyCells);
            var randEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            //console.log(randEmptyCell);
            var item = probability[Math.floor(Math.random() * probability.length)];

            matrix[Math.floor(randEmptyCell / matrix.length)][randEmptyCell % matrix.length] = item;
            return matrix;

            //console.log(rand);
            //console.log("Item : "+ item);
        }
    }


    async newGame(){
        await this.setState({
                matrix : [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
        , points: 0});
        var matrixWithRandom = DragDrop2048.randomize(this.state.matrix);
        if(matrixWithRandom!=undefined) {
            this.setState({matrix:matrixWithRandom});
        }

    }

    render() {
        return (
            <div className="drag">
                <h2>Drag/Drop 2048 GAME</h2>
                <h4>Points : {this.state.points}</h4>
                <div style={{'touch-action': 'none'}} {...SwipeReact.events}>
                {this.renderBoard()}
                </div>
                <button onClick={this.newGame}>New Game</button>
            </div>
        );
    }


    swipeElements(direction,matrix) {

        var newMatrix;
        var pairs=0;
        switch (direction){
            case 'L':
                for(var i=0; i<matrix.length; i++){
                    if(matrix[i].every(element => element === 0)){
                    }
                    else {
                        var count=0;
                        while (count<matrix.length-1) {
                            count++;
                            for(var j=0; j< matrix[i].length; j++){
                                pairs=0;
                                if(matrix[i][j+1] !=null) {
                                    if (matrix[i][j] === 0 && matrix[i][j + 1] !== 0) {
                                        var element = matrix[i][j];
                                        matrix[i][j] = matrix[i][j + 1];
                                        matrix[i][j + 1] = element;
                                    }
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
                            while (count<matrix.length) {
                                count++;
                                for (var i = 0; i < matrix.length - 1; i++) {
                                    if (matrix[i + 1][j] != null) {
                                        if (matrix[i][j] === 0 && matrix[i + 1][j] !== 0) {
                                            var element = matrix[i][j];
                                            matrix[i][j] = matrix[i + 1][j];
                                            matrix[i + 1][j] = element;
                                        }
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
                        while (count<matrix.length) {
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
                        while (count<matrix.length) {
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
