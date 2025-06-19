import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { OverlayShader } from '../assets/shaders/overlayShader'
import Overlay from '../assets/textures/paper-2.jpg'
import { TextureLoader, Vector2 } from 'three'

export default function PostProcessing({ selectedObjects = [] }) {
  const composer = useRef()
  const { gl, scene, camera, size } = useThree()

  useEffect(() => {
    const composerInstance = new EffectComposer(gl)
    composerInstance.setSize(size.width, size.height)

    const renderPass = new RenderPass(scene, camera)
    composerInstance.addPass(renderPass)

    const outlinePass = new OutlinePass(new Vector2(size.width, size.height), scene, camera)
    outlinePass.edgeStrength = 2.5
    outlinePass.edgeGlow = 0
    outlinePass.edgeThickness = 1.0
    outlinePass.visibleEdgeColor.set('#000000')
    outlinePass.hiddenEdgeColor.set('#000000')
    outlinePass.selectedObjects = selectedObjects
    composerInstance.addPass(outlinePass)

    const overlayPass = new ShaderPass(OverlayShader)

    overlayPass.material.depthTest = false
    overlayPass.material.depthWrite = false
    overlayPass.material.transparent = true
    overlayPass.material.blending = THREE.NormalBlending // ou AdditiveBlending si tu veux plus d’effet

    new TextureLoader().load(Overlay, (tex) => {
      overlayPass.uniforms.tOverlay.value = tex
    })

    overlayPass.uniforms.uOpacity.value = 0.2
    overlayPass.uniforms.uFadeCenter.value = 0.4
    overlayPass.uniforms.uFadeStrength.value = 1.5

    // composerInstance.addPass(overlayPass)

    composer.current = composerInstance
  }, [gl, scene, camera, size, selectedObjects])

  useFrame(() => {
    composer.current?.render()
  }, 1)

  useEffect(() => {
    composer.current?.setSize(size.width, size.height)
  }, [size])

  return null
}
