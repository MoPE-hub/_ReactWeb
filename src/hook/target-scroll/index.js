import { useState, useEffect, useRef } from 'react'

const useScroll = (params) => {

  const prevScrollY = useRef(0)
  const [scroll, setScroll] = useState({
    scroll: null,
    direction: null
  })

  useEffect(() => {
    const updateScroll = e => {
      const currentScrollY = document.getElementById(params).scrollTop

      if (prevScrollY.current < currentScrollY) {
        setScroll({
          ...scroll,
          scroll: currentScrollY,
          direction: false,
          isScroll: true
        })
      }

      if (prevScrollY.current > currentScrollY) {
        setScroll({
          ...scroll,
          scroll: currentScrollY,
          direction: true
        })
      }

      prevScrollY.current = currentScrollY
    }

    document.getElementById(params).addEventListener("scroll", updateScroll)
    return () => document.getElementById(params).removeEventListener("scroll", updateScroll)
  }, [scroll])

  return scroll
}

export default useScroll
