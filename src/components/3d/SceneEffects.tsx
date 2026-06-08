/** Atmospheric scene-level effects: fog + subtle time uniforms */
export function SceneEffects() {
  return (
    <>
      {/* Warm exponential fog — thickens with depth */}
      <fogExp2 attach="fog" args={['#B86A2A', 0.016]} />
    </>
  );
}
