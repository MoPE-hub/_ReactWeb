import { useEffect, useState } from 'react'

function useGetWidth() {
  const [ getWidth, setGetWidth ] = useState({
    width: undefined
  });

  useEffect(() => {
    function handleResize() {
      setGetWidth({
        width: window.innerWidth
      })
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return getWidth
}

export default useGetWidth
