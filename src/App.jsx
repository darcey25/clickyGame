import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Card from "./components/Card";
import initialCards from "./cards.json";

// Fisher-Yates shuffle; returns a new array.
const shuffle = list => {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

function App() {
  const [cards, setCards] = useState(initialCards);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [message, setMessage] = useState("Click a card to begin ");
  const [lost, setLost] = useState(false);

  const handleClick = id => {
    if (guessed.includes(id)) {
      setMessage("Keep playing to improve your memory! better luck next time!");
      setCount(0);
      setGuessed([]);
      setLost(true);
      return;
    }

    setHighScore(Math.max(highScore, count + 1));
    setLost(false);
    setCards(shuffle(initialCards));

    if (count + 1 === initialCards.length) {
      setMessage("Congratulations! Can you win a second time?");
      setCount(0);
      setGuessed([]);
    } else {
      setMessage("Good Guess!");
      setCount(count + 1);
      setGuessed([...guessed, id]);
    }
  };

  const messageStyle = { fontSize: 30, paddingTop: 20, textAlign: "center" };
  if (lost) messageStyle.color = "rgb(153,3,3)";

  return (
    <div>
      <Nav
        message="Rules: Don't click on the same card twice or you'll lose"
        score={count}
        highScore={highScore}
      />
      <div className="main">
        <p style={messageStyle}>{message}</p>
        {cards.map(card => (
          <Card
            handleClick={handleClick}
            key={card.id}
            id={card.id}
            name={card.name}
          />
        ))}

        <footer className="footer">
          <img src={logo} className="App-logo" alt="logo" />
        </footer>
      </div>
    </div>
  );
}

export default App;
