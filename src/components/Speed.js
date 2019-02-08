import React, { useState } from 'react';
import Slider from './Slider'

import './Speed.css';

const DEFAULTS = { min: 10, max: 120, step: 5, defaultValue: 30 }

function Speed({ action }) {
  const [tempoTitle, setSpeedTitle] = useState(`Speed (${DEFAULTS.defaultValue})`)

  function handleChange(value) {
    setSpeedTitle(`Speed (${value})`)
    if (typeof action === 'function') action(value)
  }

  return (
    <div className="speed__container">
      <Slider onChange={handleChange} {...DEFAULTS} />
      <label className="speed__label" htmlFor="speed">{tempoTitle}</label>
    </div>
  );
}

export default Speed
