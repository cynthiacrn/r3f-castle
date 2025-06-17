import { useEffect, useState } from 'react'

export function useMousePosition(size) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      setMouse({
        x: (e.clientX / size.width - 0.5) * 2,
        y: -(e.clientY / size.height - 0.5) * 2,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [size])

  return mouse
}
