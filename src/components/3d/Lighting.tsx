export function Lighting() {
  return (
    <>
      {/* Soft warm fill */}
      <ambientLight intensity={0.55} color="#FFD4A0" />

      {/* Golden-hour sun — high and to the right */}
      <directionalLight
        position={[10, 14, -8]}
        intensity={2.8}
        color="#FFA050"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={60}
        shadow-camera-near={0.5}
      />

      {/* Cool blue sky rim from the left */}
      <directionalLight
        position={[-8, 5, 4]}
        intensity={0.5}
        color="#7AC8FF"
      />

      {/* Warm ground bounce */}
      <hemisphereLight args={['#FFC070', '#5A3A10', 0.45]} />
    </>
  );
}
