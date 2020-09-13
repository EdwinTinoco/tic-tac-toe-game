import React, { useEffect, useState } from 'react';
import Square from './square'


export default function App() {
  const resetBoard = ["", "", "", "", "", "", "", "", ""];

  const [playerXScore, setPlayerXScore] = useState(0)
  const [playerOScore, setPlayerOScore] = useState(0)

  const [gameValue, setGameValue] = useState(resetBoard)
  const [isPlayerXTurn, setIsPlayerXTurn] = useState(false)
  const [gameTie, setGameTie] = useState(0)

  const handleClicked = (val) => {
    let values = Array.from(gameValue);

    console.log('values game', values);

    if (values[val])
      return;

    if (isPlayerXTurn) {
      values[val] = "X"

      setGameTie(gameTie + 1)
    } else {
      values[val] = "0"

      setGameTie(gameTie + 1)
    }

    console.log('values game', values);

    setIsPlayerXTurn(!isPlayerXTurn)
    setGameValue(values)
  }

  const getWinner = () => {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (var i = 0; i < rows.length; i++) {
      const [x, y, z] = rows[i];


      console.log('x y z', x, y, z);
      console.log('game value', gameValue[x], gameValue[y], gameValue[z]);

      if (gameValue[x] && gameValue[x] === gameValue[y] && gameValue[x] === gameValue[z]) {
        return gameValue[x];
      }
    }

    return null;
  }

  const handleResetGame = () => {
    setGameValue(resetBoard)
    setGameTie(0)
  }

  useEffect(() => {
    let winnerPlayer = getWinner();
    console.log('winner', winnerPlayer);


    if (winnerPlayer) {
      if (winnerPlayer === "X") {
        alert(`The winner is Player ${winnerPlayer}`)

        setPlayerXScore(playerXScore + 1)

        handleResetGame();
      } else {
        alert(`The winner is Player ${winnerPlayer}`)

        setPlayerOScore(playerOScore + 1)

        handleResetGame();
      }
    } else if (gameTie === 9) {
      alert(`The game is tie, nobody wins!`)

      handleResetGame();
    }

  }, [gameValue])


  return (
    <div className="container">
      <p className="title">Tic Tac Toe Game</p>

      <div className="score">
        <p>
          Player X Score: {playerXScore}
        </p>

        <p>
          Player O Score: {playerOScore}
        </p>
      </div>

      <div className="row">
        <Square className="border-right-bottom" val={gameValue[0]} handleClicked={() => handleClicked(0)} />
        <Square className="border-right-bottom" val={gameValue[1]} handleClicked={() => handleClicked(1)} />
        <Square className="border-bottom" val={gameValue[2]} handleClicked={() => handleClicked(2)} />
      </div>

      <div className="row">
        <Square className="border-right-bottom" val={gameValue[3]} handleClicked={() => handleClicked(3)} />
        <Square className="border-right-bottom" val={gameValue[4]} handleClicked={() => handleClicked(4)} />
        <Square className="border-bottom" val={gameValue[5]} handleClicked={() => handleClicked(5)} />
      </div>

      <div className="row">
        <Square className="border-right" val={gameValue[6]} handleClicked={() => handleClicked(6)} />
        <Square className="border-right" val={gameValue[7]} handleClicked={() => handleClicked(7)} />
        <Square val={gameValue[8]} handleClicked={() => handleClicked(8)} />
      </div>

      <button className="reset-button" onClick={handleResetGame}>Reset Game</button>
    </div>
  );
}
