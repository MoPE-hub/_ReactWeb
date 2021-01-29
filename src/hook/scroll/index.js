import { useState, useEffect, useRef } from 'react'

const useScroll = () => {

  const prevScrollY = useRef(0)
  const [scroll, setScroll] = useState({
    scroll: null,
    direction: null
  })

  useEffect(() => {
    const updateScroll = e => {
      const currentScrollY = window.scrollY

      if (prevScrollY.current < currentScrollY) {
        setScroll({...scroll, scroll: currentScrollY, direction: false})
      }

      if (prevScrollY.current > currentScrollY) {
        setScroll({...scroll, scroll: currentScrollY, direction: true})
      }
      prevScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [scroll])

  return scroll
}

export default useScroll
