import { useState } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  const [level, setLevel] = useState('easy');
  const [theme, setTheme] = useState('emojis');
  const [startGame, setStartGame] = useState(false);
  const [gameId, setGameId] = useState(0);

  // Debug log to verify theme is updating
  console.log("Current theme in App:", theme);

  const handleStart = () => {
    // Small delay to let setTheme/setLevel finish updating
    setTimeout(() => {
      setGameId((prev) => prev + 1);
      setStartGame(true);
    }, 0);
  };

  const handleReset = () => {
    setStartGame(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Memory Flip Game</h1>

        {!startGame && (
          <div className="config-panel">
            <div>
              <label>Choose Level: </label>
              <select onChange={(e) => setLevel(e.target.value)} value={level}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label>Choose Theme: </label>
              <select onChange={(e) => setTheme(e.target.value)} value={theme}>
                <option value="emojis">Emojis</option>
                <option value="numbers">Numbers</option>
              </select>
            </div>
            <button onClick={handleStart}>Start Game</button>
          </div>
        )}

        {startGame && (
          <GameBoard
            key={gameId}
            level={level}
            theme={theme}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

export default App;
