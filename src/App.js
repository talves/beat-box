import React, { useReducer } from "react";

import beats from './beats'
import Beat from './components/Beat'
import Mode from './components/Mode'
import Reset from './components/Reset'
import Speed from './components/Speed'

import './App.css';
// <div key={item.name} ><audio controls><source type="audio/wav" src={item.beat}/></audio></div>

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { bpm: 60, clear: true, loop: false, display: "" },
  )

  const activateDisplay = (message) => {
    setState({ display: message });
  }
  const activateLoop = (value) => {
    setState({ loop: value })
  }
  const changeSpeed = (tempo) => {
    setState({ bpm: tempo })
  }
  const reset = () => {
    setState({ clear: true })
  }
  const undoReset = () => {
    setState({ clear: false })
  }

  return (
    <div className="App">
      <div className="control__wrapper">
        <Mode loop={state.loop} action={activateLoop} />
        <Reset action={reset} />
        <Speed action={changeSpeed} />
      </div>
      <div className="App-content">
        <header className="App-grid">
          {beats.map(item => {
            return (
              <Beat
                key={item.name}
                id={item.name}
                letter={item.shortcut}
                sound={item.beat}
                name={item.name}
                onScreen={activateDisplay}
                loop={state.loop}
                bpm={state.bpm}
                clear={state.clear}
                undoReset={undoReset}
                className="boom-beat"
              />
            )
          })}
        </header>
      </div>
      <section>
      </section>
    </div>
  );
}

export default App;
