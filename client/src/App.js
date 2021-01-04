import './App.css';

function App() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    console.log("Voice is activated, the browser is listening!");
  };

  recognition.onresult = event => {
    console.log(event);
  }

  const handleClick = () => {
    recognition.start();
  };

  return (
    <div className="App">
      <button className="talk" onClick={handleClick}>Talk</button>
      <h3 className="content"></h3>
    </div>
  );
}

export default App;
