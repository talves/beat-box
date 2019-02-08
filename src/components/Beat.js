import React, { useReducer, useEffect } from 'react';
import './Beat.css';

function Beat({ id, undoReset, onScreen, name, sound, loop, bpm, letter, clear }) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { lightup: false, looping: loop, loopID: null, interval: 60000 / bpm },
  )
  const lightOn = () => {
    setState({lightup: true});
    // onScreen function defined in app.js - changes the parent's 'display' state to the name of the key that was just pressed
    onScreen(name);
  }
  const lightOff = () => {
    setState({lightup: false});
  }
  const playBeat = () => {
    const audio = new Audio(sound);
    audio.type = 'audio/wav';
    // if key is already looping, then pressing again should stop the loop (assigned to the key's loopID state)
    if (state.looping && state.loopID) {
      clearInterval(state.loopID)
      setState({looping: false});
    }
    // if parent passes loop boolean prop - sound plays on a loop/interval
    else if (loop) {
      lightOn();
      audio.play();
      setState({looping: true, loopID: setInterval(function(){
        audio.play()
      }, state.interval)});
    }
    else audio.play();
  }
  const mouseDown = (event) => {
    event.preventDefault()
    lightOn()
    playBeat()
  }
  const mouseUp = (event) => {
    event.preventDefault()
    if (!state.looping) lightOff()
  }
  const onBeatDown = (e) => {
    if (e.key === letter.toLowerCase()) mouseDown(e)
  }
  useEffect(() => {
    function keyDown(e) {
      if (e.key === letter.toLowerCase()) mouseDown(e)
    }
    document.addEventListener('keydown', keyDown)
    return () => document.removeEventListener('keydown', keyDown);
  }, [])
  useEffect(() => {
    function keyUp(e) {
      if (e.key === letter.toLowerCase()) {
        mouseUp(e)
      }
    }
    document.addEventListener('keyup', keyUp)
    return () => document.removeEventListener('keyup', keyUp);
  }, [])

  useEffect(() => {
    setState({interval: 60000 / bpm})
  }, [bpm])
  useEffect(() => {
    clearInterval(state.loopID)
    lightOff()
    undoReset()
  }, [clear])

  return (
    <div className='beat__container'>
      <button
        title={`Interval ${state.interval/1000}`}
        className={`beat__button${state.lightup ? ' beat__button--lit' : ''}`}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onKeyPress={onBeatDown}
      >{id}</button>
    </div>
    )
}

export default Beat
