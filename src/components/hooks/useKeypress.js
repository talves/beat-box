import { useEffect, useState } from "react"

export const useKeypress = ({ key }) => {
  const [keyPressed, setKeypressed] = useState({
    up: false,
    down: false,
    key: key
  });

  function keyDown(event) {
    if (key && event.key === key.toLowerCase()) {
      setKeypressed({ up: false, down: true, key: key })
    }
  }
  function keyUp(event) {
    if (event.key === key.toLowerCase()) {
      setKeypressed({ up: true, down: false, key: key })
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keyDown)
    document.addEventListener("keyup", keyUp)
    return () => {
      document.removeEventListener("keydown", keyDown)
      document.removeEventListener("keyup", keyUp)
    };
  }, []);

  return keyPressed
}
