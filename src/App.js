import React, { useState, useEffect } from 'react';

import './App.css';

import { showNotification as show } from './helpers.js';

import Header from './Components/Header.js';
import Figure from './Components/Figure.js';
import WrongLetters from './Components/WrongLetters.js';
import Word from './Components/Word.js';

import PopUp from './Components/PopUp.js';
import Notification from './Components/Notification.js';

const words = [
  'application',
  'programming',
  'interface',
  'wizard',
  'pizza',
  'kazoo',
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  //let playable = true;
  const [playable, setPlayable] = useState(true);
  //const correctLetters = [];
  const [correctLetters, setCorrectLetters] = useState([]);
  //const wrongLetters = [];
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key, keyCode } = e;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            //correctLetters.push(letter);
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            //wrongLetters.push(letter);
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <div>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <PopUp
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
