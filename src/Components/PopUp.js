import React, { useEffect } from 'react';

import { checkWin } from '../helpers.js';

function PopUp({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) {
  let finalMsg = '';
  let finalReveal = '';
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
    finalMsg = 'You Win! 😁';
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMsg = 'You Lose! 😕';
    finalReveal = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div
      className='popup-container'
      style={finalMsg !== '' ? { display: 'flex' } : {}}
    >
      <div className='popup'>
        <h2>{finalMsg}</h2>
        <h3>{finalReveal}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
}

export default PopUp;
