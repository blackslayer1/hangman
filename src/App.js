import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [letter, setLetter] = useState('');
  const [guess, setGuess] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [guesses, setGuesses] = useState(5);
  const [checked, setChecked] = useState(false);
  const [totalWins, setTotalWins] = useState(0);

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

  useEffect(() => {
    let index = randomIntFromInterval(1, word.length);
    setLetter(word.charAt(index));
    setDisplayWord(setCharAt(word,index,'_'));
  }, [word]);

  const changeWord = () => {
    fetch('https://random-word-api.herokuapp.com/word')
    .then((response) => response.json())
    .then((data) => setWord(data[0]));
  }

  const guessFunction = () => {
    if(guesses !== 0){
    if(guess === ''){
      alert("Type a letter")
    } else if(guess === letter){
      alert("You win!");
      setTotalWins(totalWins+1);
    } else {
      alert("Try again.");
      setGuesses(guesses-1);
    }
  } else {
    alert("Out of guesses!")
    document.body.style.pointerEvents='none';
  }
  }

  const changeHandler = (e) => {
      setGuess(e.target.value);
  }

  const checkbox = (e) => {
    if(e.target.checked){
      setChecked(true);
    } else {
      setChecked(false);
    }
}

  return (
    <div className="App">
      <div><h1>{displayWord}</h1></div>
      <div>      {checked &&
        <h2>
          {letter}
        </h2>
      }</div>
      <input onChange={changeHandler} style={{height: "40px", width: "30px"}}/>
      <button onClick={guessFunction}>Guess</button>
      <button onClick={changeWord}>Change word</button>
      <div>Guesses left: {guesses}</div>
      <input type="checkbox" id="developer" onChange={checkbox}/>
      <label>Developer Mode</label>
      <div className='totalWins'>Total wins: {totalWins}</div>
    </div>
  );
}

export default App;
