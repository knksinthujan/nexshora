import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { SceneCamera } from './SceneCamera';
import { Lighting } from './Lighting';
import { SceneEffects } from './SceneEffects';
import { ModelLoader } from './ModelLoader';

export function HeroScene() {
  return (
    <Canvas
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.8, 16], fov: 52 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <color attach="background" args={['#1a0f08']} />
      <SceneCamera />
      <Lighting />
      <SceneEffects />
      <Suspense fallback={null}>
        <ModelLoader />
      </Suspense>
    </Canvas>
  );
}
