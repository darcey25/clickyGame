import React from "react";
import "./Card.css";

const Card = props => 	

	<div className="card" key={props.id} onClick={() => props.handleClick(props.id)} >
		<img className="image" alt={props.name} src={require(`../../images/${props.name}.png`)} />
	</div>
export default Card;