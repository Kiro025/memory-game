import { useEffect, useState } from 'react';
import Card from './Card';
import { getImages } from '../data/images';
import './GameBoard.css';

function GameBoard({ level, theme, onReset }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getNumPairs = () => {
    if (level === 'easy') return 4;
    if (level === 'medium') return 8;
    return 12;
  };

  const getGridTemplateColumns = () => {
    if (level === 'easy') return 'repeat(4, 1fr)';
    if (level === 'medium') return 'repeat(4, 1fr)';
    return 'repeat(6, 1fr)';
  };

  const initializeGame = () => {
    const numPairs = getNumPairs();
    const selected = getImages(theme).slice(0, numPairs);
    const duplicated = [...selected, ...selected];
    const shuffled = duplicated
      .map((img) => ({ img, id: Math.random() }))
      .sort(() => 0.5 - Math.random());

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setDisabled(false);
    setMoves(0);
    setTime(0);
    setTimerActive(true);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [level, theme]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);
      const [i, j] = flipped;
      if (cards[i].img === cards[j].img) {
        setMatched((prev) => [...prev, cards[i].img]);
      }
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (
      matched.length === getNumPairs() &&
      flipped.length === 0 &&
      cards.length > 0
    ) {
      setTimerActive(false);
      setGameWon(true);
    }
  }, [matched, flipped, cards]);

  const handleFlip = (index) => {
    if (disabled) return;
    if (flipped.length === 2 || flipped.includes(index)) return;
    setFlipped((prev) => [...prev, index]);
  };

  const handlePlayAgain = () => {
    initializeGame(); // reset the board
  };

  return (
    <div className="gameboard">
      <button className="back-button" onClick={() => setShowConfirm(true)}> ← Back to Menu</button>
      <div className="stats">
        <p><strong>Time:</strong> {time}s</p>
        <p><strong>Moves:</strong> {moves}</p>
      </div>
      <div className="grid" style={{ gridTemplateColumns: getGridTemplateColumns() }}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            img={card.img}
            flipped={flipped.includes(index) || matched.includes(card.img)}
            onClick={() => handleFlip(index)}
          />
        ))}
      </div>
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>Are you sure you want to leave the game?</p>
            <div className='confirm-actions'>
            <button onClick={() => { setShowConfirm(false); onReset(); }}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      {gameWon && (
       <div className="confirm-modal">
          <div className="confirm-box">
            <p>🎉 You matched all pairs! Well done!</p>
            <div className='confirm-actions'>
            
      <button onClick={() => { handlePlayAgain();setShowConfirm(false);  }}>Play Again</button>
      <button onClick={() => { setShowConfirm(false); onReset(); }}>Menu</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// 
export default GameBoard;
