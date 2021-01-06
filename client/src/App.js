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
  const [speechResponse, setSpeechResponse] = useState('');

  // Responses
  const greetings = ["Hello, how are you?", "Hi, it's a beautiful day!", "Warm greetings to you!", "The Overlord extends his greetings."]

  recognition.onstart = () => {
    console.log("Voice is activated, the browser is listening!");
  };

  recognition.onresult = event => {
    console.log(event);

    // Grab the voice input string and set it to state
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    setSpeechTranscript(transcript);

    // This is where the browser voice action happens
    readOutLoud(transcript);
  }

  const handleClick = () => {
    recognition.start();
  };

  const readOutLoud = message => {
    const speech = new SpeechSynthesisUtterance();

    // Default voice response
    speech.text = "I don't have a response programmed for what you said.";
    setSpeechResponse("I don't have a response programmed for what you said.");

    // Conditional voice responses
    if(message.includes("hello")){
      // Set the speech to a random response in the greetings array
      const finalText = greetings[Math.floor(Math.random() * greetings.length)];

      setSpeechResponse(finalText);
      speech.text = finalText;
    };

    // Speech customization
    // All ranges are 0-1
    speech.volume = 1;
    speech.rate = 1;  // Speed
    speech.pitch = 1;

    // This is where the actual talking happens
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="App" style={{ }}>
      <h1>Press the button and say hello!</h1>
      <button className="talk" onClick={handleClick}>Talk</button>
      <h3 className="content">You said: {speechTranscript ? speechTranscript : "Nothing, yet!"}</h3>
      <h3 className="response">Response: {speechResponse ? speechResponse : "Nothing, yet!"}</h3>
    </div>
  );
}

export default App;
