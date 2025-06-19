import './App.css'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'

function App() {
  return (
    <Canvas
      camera={{ position: [60, 20, 120], fov: 45, near: 0.1, far: 1000 }}
      gl={{
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        outputEncoding: THREE.sRGBEncoding
      }}
    >
      <Experience />
    </Canvas>
  )
}

export default App
