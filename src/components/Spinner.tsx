import { useEffect, useState } from 'react'

const chars = ['\\', '|', '/', '-']

function Spinner() {
  const [n, setN] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setN(prev => (prev + 1) % chars.length),
      200,
    )
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <>{chars[n]}</>
}

export default Spinner
