import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  // let counter=0;

  const addValue = () => {
    // counter=counter+1

    // console.log("counter is",counter); //without usState not show changes
    if (counter >= 20) {
      alert("not allowed");
    } else {
      setCounter(counter + 1);
    }
  };
  const removeValue = () => {
    if (counter <= 0) {
      alert("not allowed");
    } else {
      // counter=counter-1
      setCounter(counter - 1);
      // console.log("counter is",counter); //without usState not show changes
    }
  };

  return (
    <>
      <h1>Counter App</h1>
      <p>Count is {counter}</p>
      <button onClick={addValue}>Increase</button>
      <button onClick={removeValue}>Decrease</button>
      <footer>Counter in footer {counter}</footer>
    </>
  );
}

export default App;
