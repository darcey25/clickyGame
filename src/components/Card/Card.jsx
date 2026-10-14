import "./Card.css";

const images = import.meta.glob("../../images/*.png", {
  eager: true,
  import: "default",
});

const Card = props => (
  <div className="card" onClick={() => props.handleClick(props.id)}>
    <img
      className="image"
      alt={props.name}
      src={images[`../../images/${props.name}.png`]}
    />
  </div>
);

export default Card;
