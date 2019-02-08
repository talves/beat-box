import React, { useState, useEffect } from 'react'

const ARROW_ACTIONS = ['ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft']

function Slider({ id = 'speed', onChange, min, max, step, defaultValue }) {
  const [minimum, setMinimum] = useState(min)
  const [maximum, setMaximum] = useState(max)
  const [stepping, setStepping] = useState(step)

  useEffect(() => {
    setMinimum(min)
  }, [min])
  useEffect(() => {
    setMaximum(max)
  }, [max])
  useEffect(() => {
    setStepping(step)
  }, [step])

  function handleChange(event) {
    if (typeof onChange === 'function') onChange(event.target.value)
  }

  useEffect(() => {
    function sliderFocus(event) {
      if (ARROW_ACTIONS.indexOf(event.key) >= 0) {
        document.getElementById(`${id}`).focus()
      }
    }
    document.addEventListener('keydown', sliderFocus)
    return () => document.addEventListener('keydown', sliderFocus)
  }, [])

  return (
    <input
      id={id}
      name={id}
      className="speed__slider"
      type="range"
      min={minimum}
      max={maximum}
      step={stepping}
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  )
}

export default Slider
