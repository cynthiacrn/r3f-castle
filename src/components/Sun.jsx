import * as THREE from 'three'
import { useMemo } from 'react'

export default function Sun() {
  const sunPosition = new THREE.Vector3(10, 40, -90)

  const sunMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#fff1c1',
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  }), [])

  const haloMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#fff1c1',
    transparent: true,
    opacity: 0.05,
    depthWrite: false,
  }), [])

  return (
    <>
      <mesh position={sunPosition}>
        <sphereGeometry args={[20, 32, 32]} />
        <primitive object={sunMaterial} attach="material" />
      </mesh>

      <mesh position={sunPosition}>
        <sphereGeometry args={[30, 32, 32]} />
        <primitive object={haloMaterial} attach="material" />
      </mesh>
    </>
  )
}
