import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import Card from "./components/Card";
import cards from "./cards.json";

class App extends Component {

  state = {
    cards,
    count: 0,
    highScore: 0,
    guessed: [],
    message: "Click a card to begin ",
    lost: false
  };

  handleClick = id => {
    const guessed = this.state.guessed;
    if (guessed.indexOf(id) === -1) {
      guessed.push(id);
      if(this.state.count >= this.state.highScore) {
        this.setState({highScore: this.state.count + 1});
      }
      if(this.state.lost) {
        this.setState({lost: false});
      }
      this.setState({guessed: guessed});
      const shuffled = cards.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        this.setState({ cards: shuffled });
      this.updateCount();
    }
    else{
      this.setState({message: "Keep playing to improve your memory! better luck next time!"});
      this.setState({count: 0});
      this.setState({guessed: []});
      this.setState({lost: true});
    }
  };

  updateCount() {
    if(this.state.count === 11) {
      this.win();
    } else {
    this.setState({count: this.state.count + 1});
    this.setState({message: "Good Guess!"});
    }
  };
  
  win() {
    console.log("checking to see if i won");
    console.log(this.state.count);
      this.setState({message: "Congratulations! Can you win a second time?"});
      this.setState({count: 0});
      this.setState({guessed: []});
  };



  render() {
    const status = this.state.lost;
    return (
      <div >
        <Nav 
          message = "Rules: Don't click on the same card twice or you'll loose"
          score = {this.state.count}
          highScore = {this.state.highScore}
        />
        <div className="main">
        <p style={status ?  {fontSize: 30, paddingTop: 20, textAlign: "center", color: "rgb(153,3,3)"} : {fontSize: 30, paddingTop: 20, textAlign: "center"}}>{this.state.message}</p>
        {this.state.cards.map((card, index) => (
            <Card 
              handleClick = {this.handleClick}
              key = {index}
              id = {card.id}
              name = {card.name}
              img = {card.image}
            />

          ))}
        
        <footer className="footer">
          <img src={logo} className="App-logo" alt="logo" />
        </footer>
        </div>
      </div>
    );
  }
}

export default App;
