import React from "react";
import "./Nav.css";

const Nav = props => 
	
	<div className="nav" >
		<span className="left"><h4 style={{fontSize: 24}}>{props.message}</h4></span>
		<span className = "right">points: {props.score} | high score: {props.highScore}</span>

	</div>

	export default Nav;