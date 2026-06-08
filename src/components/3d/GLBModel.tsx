import { Component, type ReactNode, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Minimal error boundary so a missing GLB falls back to procedural ─── */
type EBProps = { fallback: ReactNode; children: ReactNode };
type EBState = { error: boolean };

class ModelErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { error: false };
  static getDerivedStateFromError(): EBState { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

/* ─── Raw GLTF loader (throws on missing file — caught by boundary above) ─── */
function RawGLB({
  url, position, rotation, scale,
}: {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const clone = scene.clone(true);

  /* ensure every mesh casts / receives shadows */
  clone.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      (obj as THREE.Mesh).castShadow    = true;
      (obj as THREE.Mesh).receiveShadow = true;
    }
  });

  return (
    <primitive
      object={clone}
      position={position ?? [0, 0, 0]}
      rotation={rotation ?? [0, 0, 0]}
      scale={scale ?? 1}
    />
  );
}

/* ─── Safe public API — use these in ModelLoader ─── */

/**
 * Loads /models/mountains.glb (place in public/models/).
 * Falls back silently to `fallback` if the file is missing.
 */
export function SafeGLBModel({
  url,
  fallback,
  position,
  rotation,
  scale,
}: {
  url: string;
  fallback?: ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}) {
  return (
    <ModelErrorBoundary fallback={fallback ?? null}>
      <Suspense fallback={null}>
        <RawGLB url={url} position={position} rotation={rotation} scale={scale} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
