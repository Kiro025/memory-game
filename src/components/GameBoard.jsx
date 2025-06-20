import { useEffect, useState } from 'react';
import Card from './Card';
import { getImages } from '../data/images';
import './GameBoard.css';

function GameBoard({ level, theme, onReset }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false); // lock flips during comparison
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);


  // Number of pairs per level
  const getNumPairs = () => {
    if (level === 'easy') return 4;      // 8 cards
    if (level === 'medium') return 8;    // 16 cards
    return 12;                           // 24 cards
  };

  // Dynamic grid layout per level
  const getGridTemplateColumns = () => {
    if (level === 'easy') return 'repeat(4, 1fr)';    // 4x2
    if (level === 'medium') return 'repeat(4, 1fr)';  // 4x4
    return 'repeat(6, 1fr)';                          // 6x4
  };

  // Initialize cards
  useEffect(() => {
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
    if (matched.length === getNumPairs()) {
      setTimerActive(false);
    }
  }, [matched]);


  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1); //counts the move
  
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
  
  
  

  // Handle flip
  const handleFlip = (index) => {
    if (disabled) return;
    if (flipped.length === 2 || flipped.includes(index)) return;
    setFlipped((prev) => [...prev, index]);
  };

  // Check for match
  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);

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

  // Check win
  const isGameWon = matched.length === getNumPairs();

  return (
    <div className="gameboard">
      <button className="back-button" onClick={onReset}>← Back to Menu</button>

      <div className="stats">
        <p><strong>Time:</strong> {time}s</p>
        <p><strong>Moves:</strong> {moves}</p>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            img={card.img}
            flipped={flipped.includes(index) || matched.includes(card.img)}
            onClick={() => handleFlip(index)}
          />
        ))}
      </div>

      {isGameWon && (
        <p className="victory">🎉 You matched all pairs! Well done!</p>
      )}
    </div>
  );
}

export default GameBoard;
