import { ScrollControls, useScroll } from '@react-three/drei'
import SceneContent from './SceneContent'
import { useEffect } from 'react'
import { cameraSteps } from '../utils/cameraSteps'

export default function Experience({ setSectionIndex }) {
  return (
    <ScrollControls pages={cameraSteps.length} damping={0.5} snap>
      <ScrollSync setSectionIndex={setSectionIndex} />
      <SceneContent />
    </ScrollControls>
  )
}

function ScrollSync({ setSectionIndex }) {
  const scroll = useScroll()
  useEffect(() => {
    const totalSteps = cameraSteps.length
    const handleScroll = () => {
      const idx = Math.round(scroll.offset * (totalSteps - 1))
      setSectionIndex(idx)
    }
    scroll.el?.addEventListener('scroll', handleScroll)
    return () => scroll.el?.removeEventListener('scroll', handleScroll)
  }, [scroll, setSectionIndex])
  return null
}
