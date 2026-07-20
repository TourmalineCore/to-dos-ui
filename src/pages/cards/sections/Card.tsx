import "./Card.css"
import cardImg from '../../../assets/img/card-img.png'

export function Card() {
  return (
    <div
      className="card"
      data-cy="card">
      <div className="card__content">
        <div className="card__image-wrapper">
          <img
            className="card__image"
            src={cardImg}
          />
        </div>
        <h2 className="card__title">Ivanov Ivan</h2>
        <h3 className="card__subtitle">Frontend developer</h3>
        <button
          className="card__button"
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
  )
}
