import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      <Experience />
    </Canvas>
  )
}

export default App
