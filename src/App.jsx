import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import SectionTextOverlay from './components/SectionTextOverlay'
import * as THREE from 'three'

function App() {
  const [sectionIndex, setSectionIndex] = useState(0)
  return (
    <>
      <SectionTextOverlay index={sectionIndex} />
      <Canvas
        camera={{ position: [60, 20, 120], fov: 45, near: 0.1, far: 1000 }}
        gl={{
          alpha: true,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          outputEncoding: THREE.sRGBEncoding
        }}
      >
        <Experience setSectionIndex={setSectionIndex} />
      </Canvas>
    </>
  )
}

export default App
