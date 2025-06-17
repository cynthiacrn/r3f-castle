import * as THREE from 'three'
import { useEffect, useRef, useState } from "react";
import {useFrame, useThree} from "@react-three/fiber";
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useMousePosition } from '../hooks/useMousePosition'
import { logCameraPositionAndLookAt } from '../utils/logCamera'
import { createSunGradientTexture } from "../utils/createSunGradientTexture.js";
import Overlay from '../assets/textures/paper-2.jpg'
import { materials } from '../materials.js'
import PostProcessing from './PostProcessing'
import Lights from "./Lights";
import Sun from "./Sun.jsx";
import Particles from './Particles'

export default function Experience() {
  const [selectedObjects, setSelectedObjects] = useState([])
  const group = useRef()
  const { scene, camera, size, clock } = useThree()
  const { scene: modelScene } = useGLTF('./models/castle.glb')
  const mouse = useMousePosition(size)

  scene.background = createSunGradientTexture()

  useEffect(() => {
    camera.fov = 45
    camera.near = 0.1
    camera.far = 1000
    camera.updateProjectionMatrix()

    camera.position.set(60, 25, 115)
    camera.lookAt(0, 15, 0)
  }, [camera])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'p') {
        logCameraPositionAndLookAt(camera)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [camera])

  useEffect(() => {
    const localGroup = new THREE.Group()
    const localSelected = []

    modelScene.traverse((child) => {
      if (!child.isMesh) return

      if (child.name === 'Water') {
        child.material = materials.waterMaterial
      } else if (child.name === 'Ground') {
        child.material = materials.groundMaterial
        localSelected.push(child)
      } else {
        child.material = materials.castleMaterial

        const edges = new THREE.EdgesGeometry(child.geometry, 45)
        const jitter = edges.attributes.position.array
        for (let i = 0; i < jitter.length; i++) {
          jitter[i] += (Math.random() - 0.5) * 0.02
        }

        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: '#2B1F12', transparent: true, opacity: 0.6 })
        )

        line.position.copy(child.position)
        line.rotation.copy(child.rotation)
        line.scale.copy(child.scale)

        localGroup.add(line)
      }
    })

    localGroup.add(modelScene)
    group.current.add(localGroup)
    setSelectedObjects(localSelected)
  }, [modelScene])

  useFrame(() => {
    const t = clock.getElapsedTime()
    if (materials.waterMaterial.uniforms?.uTime) {
      materials.waterMaterial.uniforms.uTime.value = t
    }
    if (materials.particlesMaterial.uniforms?.uTime) {
      materials.particlesMaterial.uniforms.uTime.value = t
    }

    group.current.position.x = mouse.x * 2
    group.current.position.y = mouse.y
  })

  return (
    <>
      <Sun />
      <Lights />
      <OrbitControls />
      <Particles />
      <group ref={group} />
      <PostProcessing selectedObjects={selectedObjects} overlayTextureUrl={Overlay}/>
    </>
  )
}
