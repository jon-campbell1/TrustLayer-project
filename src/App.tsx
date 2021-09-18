import React, { useState } from 'react';
import './App.scss';
import TriviaQuestions from './components/trivia-questions';

function App() {

  const [started, setStarted] = useState<boolean>(false);

  return (
    <div className="App">
      {
        !started && 
        <div className='start-container'>
          <h2>Welcome! Click below to start Trivia.</h2>
          <button 
            onClick={() => { setStarted(true) }} 
            className='submit-btn start-btn'>
              Start Trivia!
          </button>
        </div>
      }
      {
          started && <TriviaQuestions/>
      }
    </div>
  );
}

export default App;
