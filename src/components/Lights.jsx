export default function Lights() {

  return (
    <>
      <ambientLight intensity={0.6} color={0xffffff} />
      <directionalLight
        intensity={1.2}
        color={0xffe6b0}
        position={[0, 60, -100]}
        castShadow
      />
      <directionalLight
        intensity={0.5}
        color={0xffffff}
        position={[40, 80, 40]}
      />
    </>
  )
}
