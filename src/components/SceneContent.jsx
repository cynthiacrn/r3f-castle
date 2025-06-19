import * as THREE from 'three'
import { useEffect, useLayoutEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, useScroll } from '@react-three/drei'
import { cameraSteps } from '../utils/cameraSteps'
import { useMousePosition } from '../hooks/useMousePosition'
import { createSunGradientTexture } from "../utils/createSunGradientTexture.js"
import Overlay from '../assets/textures/paper-2.jpg'
import { materials } from '../materials.js'
import PostProcessing from './PostProcessing'
import Lights from "./Lights"
import Sun from "./Sun.jsx"
import Particles from './Particles'
import gsap from 'gsap'

export default function SceneContent() {
  const group = useRef()
  const controlsRef = useRef()
  const lerped = useRef({
    position: cameraSteps[0].position.clone(),
    lookAt: cameraSteps[0].lookAt.clone(),
  })
  const scroll = useScroll()
  const { scene, size, clock, camera } = useThree()
  const { scene: modelScene } = useGLTF('./models/castle.glb')
  const mouse = useMousePosition(size)

  const currentStep = useRef(0)
  const isAnimating = useRef(false)

  useLayoutEffect(() => {
    scene.background = createSunGradientTexture()
  }, [])

  // GSAP animation on scroll step change
  useFrame(() => {
    if (!scroll || !controlsRef.current) return
  
    const totalSteps = cameraSteps.length
    const t = scroll.offset * (totalSteps - 1)
    const i = Math.floor(t)
    const next = Math.min(i + 1, totalSteps - 1)
    const lerpT = t - i
  
    const from = cameraSteps[i]
    const to = cameraSteps[next]
  
    // Dynamically adjust lerp speed: slow near steps, fast in between
    let speed = 0.08
    if (lerpT < 0.1 || lerpT > 0.9) {
      speed = 0.15 // slow down near a step for a soft pause
    }
  
    // Interpolate position and lookAt
    lerped.current.position.lerp(from.position.clone().lerp(to.position, lerpT), speed)
    lerped.current.lookAt.lerp(from.lookAt.clone().lerp(to.lookAt, lerpT), speed)
  
    camera.position.copy(lerped.current.position)
    camera.lookAt(lerped.current.lookAt)
    controlsRef.current.target.copy(lerped.current.lookAt)
    controlsRef.current.update()
  })

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
  }, [modelScene])

  useFrame(() => {
    const t = clock.getElapsedTime()
    materials.waterMaterial.uniforms?.uTime && (materials.waterMaterial.uniforms.uTime.value = t)
    materials.particlesMaterial.uniforms?.uTime && (materials.particlesMaterial.uniforms.uTime.value = t)
  })

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        enableDamping={false}
        enableRotate={false}
        enablePan={false}
        target={[0, 15, 0]}
      />
      <Sun />
      <Lights />
      <Particles />
      <group ref={group} />
      <PostProcessing selectedObjects={[]} overlayTextureUrl={Overlay} transparent={true} />
    </>
  )
}
