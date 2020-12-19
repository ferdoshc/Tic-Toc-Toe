import React, { Component } from 'react';
import Square from './Square';
import './index.css';


class Board extends Component {

    renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            className={this.props.className[i]}
            xIsNext={this.props.xIsNext }
            matches={this.props.matches }
          />
        );
    }
    
      render() {
        return (
          <div className="bg">
            <ul className="boxes">
              <li className="box">{this.renderSquare(0)}</li>
              <li className="box">{this.renderSquare(1)}</li>
              <li className="box">{this.renderSquare(2)}</li>
              <li className="box">{this.renderSquare(3)}</li>
              <li className="box">{this.renderSquare(4)}</li>
              <li className="box">{this.renderSquare(5)}</li>
              <li className="box">{this.renderSquare(6)}</li>
              <li className="box">{this.renderSquare(7)}</li>
              <li className="box">{this.renderSquare(8)}</li>
            </ul>
          </div>
        );
      }
}
 
export default Board;