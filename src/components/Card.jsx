import './Card.css';

function Card({ img, flipped, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className={flipped ? 'flipped' : ''}>
        <div className="front">
          {flipped && (
            img.type === 'emoji' ? (
              <img src={img.value} alt="emoji" />
            ) : (
              <span className="number">{img.value}</span>
            )
          )}
        </div>
        <div className="back">🂠</div>
      </div>
    </div>
  );
}

export default Card;
