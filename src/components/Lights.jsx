import { useThree } from '@react-three/fiber'

export default function Lights() {
  const { scene } = useThree()

  return (
    <>
      <ambientLight intensity={0.6} color={0xffffff} />
      <directionalLight
        intensity={0.8}
        color={0xffe6b0}
        position={[0, 60, -100]}
        castShadow
      />
      <directionalLight
        intensity={0.1}
        color={0xffffff}
        position={[40, 80, 40]}
      />
    </>
  )
}
