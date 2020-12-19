import React, { Component } from 'react';
import player1img  from './x.svg';
import player2img  from './o.svg';
import Board from './Board';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import './index.css';


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
const StartBtn = styled(Button)({

  background: 'linear-gradient(to top, #ffcc66 0%, #ffff66 100%)',
  borderRadius: 4,
  color: '#696969',
  fontSize: 20,
  top: 0,
  left: 0,
  cursor: 'pointer',
  width: 250,
  height: 80,
  textDecoration: 'none',
  fontFamily: '"Montserrat", sans-serif',
  display: 'inline-block' ,
  margin: 1 , 
  

  '&:hover':{
    background: '#eee',
  },

});


class Game extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
          history: [
            {
              squares: Array(9).fill(null),
              btnClassList: Array(9).fill('button ply1'),
            }
          ],
          stepNumber: 0,
          xIsNext: true,
          startGame: false,
          addClass: false,
          plyr1Turn : ["players player1"],
          plyr2Turn : ["players player2"],
          message : [""],
          screenWin :["screen screen-win"]
        };
      }

      toggle() {
        this.setState({addClass: !this.state.addClass});
      }      

      EndGame() {
        this.setState({
            stepNumber:0,
            startGame:false,
            xIsNext: true
        })
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const btnClassList = current.btnClassList.slice();

        let btnClass = ["button"];
        let btnClassHover = ["button"];

        if (calculateWinner(squares) || squares[i]) {
          return;
        }

        this.toggle.bind(this);
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.state.xIsNext ? btnClass.push('player1') : btnClass.push('player2');
        btnClassList[i] = btnClass.join(' ');

        this.state.xIsNext ? this.state.plyr2Turn.push('turn') : this.state.plyr1Turn.push('turn');
        this.state.xIsNext ? this.state.plyr1Turn.pop() : this.state.plyr2Turn.pop();
        
        for (let j = 0; j < 9; j++) {
          if(!squares[j] && j!==i){
            this.state.xIsNext ? btnClassHover.push('ply2') : btnClassHover.push('ply1');
            btnClassList[j] = btnClassHover.join(' '); 
          }
        }

        this.setState({
          history: history.concat([
            {
              squares: squares,
              btnClassList: btnClassList
            }
          ]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext
        });
      }
    
      render() {

        if(this.state.startGame){

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
          

        let status;
        if(winner || this.state.stepNumber===9){

          if(winner === "X"){
            status = "Player 1 wins!";
            this.state.message.push('ply1');
            this.state.screenWin.push('ply1');
          }
          else if(winner === "O"){
            status = "Player 2 wins!";
            this.state.message.push('ply2');
            this.state.screenWin.push('ply2');
          }
          else {
            status = "It's a Tie!";
            this.state.message.push('tie');
            this.state.screenWin.push('tie');
          }
          return(
          <div className={this.state.screenWin.join(' ')}>
            <header>
              <h1>Results</h1>
              <p className={this.state.message.join(' ')}>{status}</p>
              <button className="button" onClick={() => {this.setState({startGame : false,
                                                                   plyr1Turn : ["players player1"],
                                                                   plyr2Turn : ["players player2"],
                                                                   message : [""],
                                                                   screenWin :["screen screen-win"],
                                                                   stepNumber:0,
                                                                   xIsNext: true,})}}
                                                                   >New game</button>
            </header>
          </div>
          )
        }else{

        return (
          <React.Fragment>
          <div className="board">
            <header>
              <h1>GameBoard</h1>
                  <img alt="Player1" id="p1" width="42" height="42" viewBox="0 0 42 42" src={player1img} className={this.state.plyr1Turn.join(' ')} />
                  <img alt="player2" id="p2" width="42" height="42" viewBox="0 0 42 42" src={player2img} className={this.state.plyr2Turn.join(' ')} />
            </header>
            <div >{status}</div>
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
                className={current.btnClassList}
                xIsNext={this.state.xIsNext}
              />
            </div>
            </React.Fragment>
        );
        }
        }
      else{
          return(
                <div className="screen screen-start">
                  <header>
                   <h1>Tic Tac Toe</h1>
                    <StartBtn className="button" onClick={() => { this.setState({startGame : true}); this.state.plyr1Turn.push('turn')}} >
                        TWO PLAYER
                    </StartBtn>
                  </header>
                </div>
          )
      }
    }

}
 
export default Game;