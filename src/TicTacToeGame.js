import { useState } from "react";

export default function TicTacToeGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const isXNext = currentMove % 2 === 0;

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return(
    <>
    <div className="game">
    <div className="game-board">
      <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay}/>
    </div>
        <div class="game-info">
          <ol>{moves}</ol>
        </div>
    </div>
    </>
  )

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

}

export function Board({isXNext, squares, onPlay}) {
const [winner, setWinner] = useState(null);

  return (
    // Empty fragments <> are used to return multiple elements
    <>
      <div className="status">{winner ? "Winner: " + winner : "Next player: " + (isXNext ? "X" : "O")}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
    </>
  );

  function onSquareClick(i){
    if(squares[i] === "X" || squares[i] === "O" || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if(isXNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares);

    const calculatedWinner = calculateWinner(nextSquares);
    if(calculatedWinner){
      setWinner(calculatedWinner);
    }
  }

  function calculateWinner(squares){
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i < winningLines.length; i++){
      const [a, b, c] = winningLines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
}

export function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

