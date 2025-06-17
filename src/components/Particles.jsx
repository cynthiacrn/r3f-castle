import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import vertexShader from '../assets/shaders/particles/vertex.glsl'
import fragmentShader from '../assets/shaders/particles/fragment.glsl'
import { materials } from "../materials.js";

export default function Particles({ count = 300 }) {
  const pointsRef = useRef()
  const materialRef = useRef()

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 200
      positions[i3 + 1] = Math.random() * 60
      positions[i3 + 2] = (Math.random() - 0.5) * 200
      speeds[i] = 0.5 + Math.random() * 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))

    const material = materials.particlesMaterial

    return { geometry, material }
  }, [count])

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <points ref={pointsRef} geometry={geometry} material={materialRef.current = material} />
  )
}
