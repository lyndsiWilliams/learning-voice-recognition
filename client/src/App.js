// React
import { useState } from 'react';
// Styling
import './App.css';

function App() {
  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // State
  const [speechTranscript, setSpeechTranscript] = useState('');

  recognition.onstart = () => {
    console.log("Voice is activated, the browser is listening!");
  };

  recognition.onresult = event => {
    console.log(event);

    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    setSpeechTranscript(transcript);
  }

  const handleClick = () => {
    recognition.start();
  };

  return (
    <div className="App">
      <button className="talk" onClick={handleClick}>Talk</button>
      <h3 className="content">{speechTranscript}</h3>
    </div>
  );
}

export default App;
