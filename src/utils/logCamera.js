import * as THREE from 'three'

export function logCameraPositionAndLookAt(camera) {
  const pos = camera.position
  const dir = new THREE.Vector3()
  camera.getWorldDirection(dir)

  const lookAt = new THREE.Vector3().copy(pos).add(dir)

  console.log('--- CAMERA STEP ---')
  console.log('Position:', `new THREE.Vector3(${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)})`)
  console.log('LookAt:', `new THREE.Vector3(${lookAt.x.toFixed(2)}, ${lookAt.y.toFixed(2)}, ${lookAt.z.toFixed(2)})`)
}
