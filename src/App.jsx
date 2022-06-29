import { useState, useRef } from "react";

import "./App.css";

function App() {
  const [randomInput, setRandomInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const renders = useRef(0);
  const inputRef = useRef();
  const timerId = useRef();
  //! ===================== UseRef facts =====================
  //*useref rule:1 - value persists, that means it stays the same between renders

  //* useref rule#2 - updating reference doesn't trigger a re-render
  //* it is helpful to count how many time our component renders
  //* it allows us to access dom
  //! ======================================================

  const handleChange = (e) => {
    setRandomInput(e.target.value);
    //* tracking re-renders, bcuz everytime state changes, component re-renders
    renders.current++;
  };
  const focusOnInput = () => {
    inputRef.current.focus();
  };
  const startTimer = () => {
    timerId.current = setInterval(() => {
      renders.current++;
      //* every second we get a re-render
      setSeconds((prev) => prev + 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };
  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      renders.current++;
      setSeconds(0);
    }
  };
  return (
    <main className="App">
      <input
        ref={inputRef}
        type="text"
        value={randomInput}
        placeholder="random Input"
        onChange={handleChange}
      />
      <p>Renders: {renders.current}</p>
      <br />
      <br />
      <button onClick={focusOnInput}>focus</button>
      <br />
      <br />
      <section>
        <button onClick={startTimer}>setTimer</button>
        <button onClick={stopTimer}>stopTimer</button>
        <button onClick={resetTimer}>reset</button>
      </section>
      <br />
      <p>seconds: {seconds}</p>
      <br />
      <p>{randomInput}</p>
    </main>
  );
}

export default App;
