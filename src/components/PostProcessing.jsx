import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { OverlayShader } from '../assets/shaders/overlayShader'
import { TextureLoader, Vector2 } from 'three'

export default function PostProcessing({ selectedObjects = [], overlayTextureUrl }) {
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
    new TextureLoader().load(overlayTextureUrl, (tex) => {
      overlayPass.uniforms.tOverlay.value = tex
    })
    overlayPass.uniforms.uOpacity.value = 0.4
    overlayPass.uniforms.uFadeCenter.value = 0.6
    overlayPass.uniforms.uFadeStrength.value = 1.5
    composerInstance.addPass(overlayPass)

    composer.current = composerInstance
  }, [gl, scene, camera, size, selectedObjects, overlayTextureUrl])

  useFrame(() => {
    composer.current?.render()
  }, 1)

  return null
}
