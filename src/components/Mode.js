import React, { useState, useEffect } from 'react';
import './Button.css';

function Mode({ action, loop = false }) {
  const [looping, setLooping] = useState(loop)
  const onClick = event => {
    event.preventDefault()
    setLooping(!looping)
  }
  useEffect(() => {
    if (typeof action === 'function') action(looping)
    document.title = `${looping ? 'Loop' : 'Normal'} - Beat Box`
  }, [looping])


  return (
    <div className="button__container">
      <button className="action__button" onClick={onClick}>{looping ? 'Loop' : 'Normal'}</button>
    </div>
  )
}

export default Mode;
