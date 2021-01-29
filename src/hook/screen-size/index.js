import { useState, useEffect } from 'react'

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: null,
    height: null
  })

  const updateScreenSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  return screenSize
}

export default useScreenSize
