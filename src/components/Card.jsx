import './Card.css';

function Card({ img, flipped, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className={flipped ? 'flipped' : ''}>
        <div className="front">
          {flipped && (
            <span className={img.type === 'number' ? 'number' : 'emoji'}>
              {img.value}
            </span>
          )}
        </div>
        <div className="back">🂠</div>
      </div>
    </div>
  );
}

export default Card;
