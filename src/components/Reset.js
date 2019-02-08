import React from 'react'
import './Button.css'

function Reset({ action }) {
  const onClick = (e) => {
    if (typeof action === 'function') action()
  }

  return (
    <div className="button__container">
      <button className="action__button" onClick={onClick}>Reset</button>
    </div>
  )
}

export default Reset;
