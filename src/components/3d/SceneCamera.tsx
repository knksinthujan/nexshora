import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useScrollCamera } from '@/hooks/useScrollCamera';

/* ─── Camera keyframes for the full-page journey ─── */
// Each row: [scrollProgress, x, y, z, lookAtX, lookAtY]
const KF: [number, number, number, number, number, number][] = [
  [0.00,  0.0, 1.8, 16.0,  0.0, 1.2],  // hero: wide establishing shot
  [0.12,  0.5, 2.0, 13.0,  0.3, 1.1],  // first scroll: push in
  [0.25,  2.2, 2.4, 10.5,  1.5, 0.9],  // Sigiriya focus: drift right
  [0.40, -1.0, 3.0,  9.5, -0.5, 1.6],  // tea hills: pan left, rise
  [0.55,  0.5, 3.8,  8.8,  0.5, 2.2],  // elevated panorama
  [0.70, -1.5, 3.2, 10.0, -1.0, 1.5],  // beach focus: pan left
  [0.85,  0.0, 2.6, 11.5,  0.0, 1.2],  // return to center
  [1.00,  0.0, 2.0, 12.5,  0.0, 1.0],  // newsletter: pull back slightly
];

function smoothstep(t: number) { return t * t * (3 - 2 * t); }

function sampleKeyframes(t: number): [number, number, number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  let a = KF[0];
  let b = KF[KF.length - 1];
  for (let i = 0; i < KF.length - 1; i++) {
    if (clamped >= KF[i][0] && clamped <= KF[i + 1][0]) {
      a = KF[i];
      b = KF[i + 1];
      break;
    }
  }
  const span  = b[0] - a[0];
  const local = span > 0 ? smoothstep((clamped - a[0]) / span) : 0;
  return [
    a[1] + (b[1] - a[1]) * local, // x
    a[2] + (b[2] - a[2]) * local, // y
    a[3] + (b[3] - a[3]) * local, // z
    a[4] + (b[4] - a[4]) * local, // lookAtX
    a[5] + (b[5] - a[5]) * local, // lookAtY
  ];
}

export function SceneCamera() {
  const { camera } = useThree();
  const { mouse, smoothed } = useMouseParallax(0.38);
  const scroll   = useScrollCamera();
  const lookAtV  = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame(() => {
    /* Smooth mouse */
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.035;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.035;

    /* Sample the cinematic keyframe path */
    const [kx, ky, kz, klax, klay] = sampleKeyframes(scroll.current);

    /* Blend keyframe targets with mouse offset, then lerp smoothly */
    const targetX = kx + smoothed.current.x * 0.65;
    const targetY = ky + smoothed.current.y * 0.35;
    const targetZ = kz;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;

    /* Soft look-at */
    lookAtV.current.set(
      klax + smoothed.current.x * 0.15,
      klay + smoothed.current.y * 0.08,
      0,
    );
    camera.lookAt(lookAtV.current);
  });

  return null;
}
