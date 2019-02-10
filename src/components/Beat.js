import React from 'react';

import { useKeypress } from './hooks/useKeypress'

import './Beat.css';

function Beat({ id, undoReset, onScreen, name, sound, loop, bpm, letter, clear }) {
  const [lightup, setLightup] = React.useState(false)
  const [looping, setLooping] = React.useState(null)
  const [loopID, setLoopID] = React.useState(null)
  const [interval, setLoopInterval] = React.useState(60000 / bpm)
  const keypressed = useKeypress({ key: letter})

  const showLog = () => {
    console.log('-----------------------------------')
    console.log('state.looping:', looping)
    console.log('state.loopID:', loopID)
    console.log('props.loop:', loop)
    console.log('keypressed', keypressed)
  }

  const lightOn = () => {
    setLightup(true)
    // onScreen function defined in app.js - changes the parent's 'display' state to the name of the key that was just pressed
    onScreen(name);
  }
  const lightOff = () => {
    setLightup(false);
  }
  const clearLoop = () => {
    if (loopID === null) return
    console.log('Clearing loop')
    clearInterval(loopID)
    setLoopID(null);
  }
  const startLoop = () => {
    if (loopID !== null) return
    console.log('Starting loop')
    // if parent passes loop boolean prop - sound plays on a loop/interval
    setLoopID(
      setInterval(function () {
        const audio = new Audio(sound)
        audio.type = 'audio/wav'
        audio.play()
      }, interval)
    )
  }
  function playBeat({ keypressed = false }) {
    showLog()
    if (loopID !== null) {
      // if key is already looping, then pressing again should stop the loop (assigned to the key's loopID state)
      clearLoop()
    } else if (!keypressed && looping) {
      startLoop()
    }
    else {
      console.log('Playing only')
      const audio = new Audio(sound)
      audio.type = 'audio/wav'
      audio.play();
    }
  }
  const onDown = (event) => {
    event.preventDefault()
    lightOn()
    playBeat({ keypressed: (event.key) })
  }
  const onUp = (event) => {
    event.preventDefault()
    if (!loopID) lightOff()
  }

  React.useEffect(() => {
    if (keypressed.down) {
      lightOn()
      if (keypressed.up !== keypressed.down) playBeat({ keypressed: true })
    }
    if (keypressed.up && !loopID) lightOff()
  }, [keypressed.up, keypressed.down])

  React.useEffect(() => {
    setLooping(loop)
  }, [loop])

  React.useEffect(() => {
    setLoopInterval(60000 / bpm)
  }, [bpm])

  React.useEffect(() => {
    clearLoop()
    lightOff()
    undoReset()
  }, [clear])

  return (
    <div className='beat__container'>
      <button
        title={`Interval ${interval / 1000}`}
        className={`beat__button${lightup ? ' beat__button--lit' : ''}`}
        onMouseDown={onDown}
        onMouseUp={onUp}
      >{id}</button>
    </div>
  )
}

export default Beat
