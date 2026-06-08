import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SafeGLBModel } from './GLBModel';

/* ─── Sky dome ─── */
const SKY_VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const SKY_FRAG = /* glsl */`
  varying vec2 vUv;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uGlow;
  void main() {
    float t = clamp(vUv.y, 0.0, 1.0);
    vec3 sky  = mix(uHorizon, uTop, smoothstep(0.0, 0.65, t));
    vec3 glow = uGlow * pow(1.0 - smoothstep(0.0, 0.42, t), 2.2);
    gl_FragColor = vec4(sky + glow, 1.0);
  }
`;

function SkyDome() {
  const uniforms = useRef({
    uTop:     { value: new THREE.Color('#192860') },
    uHorizon: { value: new THREE.Color('#D46020') },
    uGlow:    { value: new THREE.Color('#FFAA38') },
  });
  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[48, 32, 32]} />
      <shaderMaterial
        vertexShader={SKY_VERT}
        fragmentShader={SKY_FRAG}
        uniforms={uniforms.current}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Sun — disc + pulsing halo ─── */
function SunDisc() {
  const haloRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!haloRef.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 0.55) * 0.07;
    haloRef.current.scale.setScalar(s);
    (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.055 + Math.sin(t * 0.55) * 0.012;
  });
  return (
    <group position={[6, 6.5, -42]}>
      {/* wide soft halo */}
      <mesh ref={haloRef} renderOrder={0}>
        <circleGeometry args={[6.5, 48]} />
        <meshBasicMaterial
          color="#FFAA30"
          transparent
          opacity={0.055}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* core disc */}
      <mesh renderOrder={1}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial
          color="#FFE880"
          transparent
          opacity={0.88}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ─── Indian Ocean — GLSL animated waves ─── */
const WATER_VERT = /* glsl */`
  uniform float uTime;
  varying vec2 vUv;
  varying float vHeight;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float w =
      sin(pos.x * 0.50 + uTime * 1.25) * 0.17 +
      sin(pos.y * 0.70 + uTime * 0.95) * 0.12 +
      sin((pos.x * 0.30 - pos.y * 0.45) + uTime * 1.70) * 0.07 +
      sin(pos.x * 1.20 + uTime * 2.10) * 0.03;
    pos.z += w;
    vHeight = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const WATER_FRAG = /* glsl */`
  varying vec2 vUv;
  varying float vHeight;
  void main() {
    vec3 deep    = vec3(0.04, 0.23, 0.40);
    vec3 shallow = vec3(0.10, 0.54, 0.66);
    float t = clamp((vHeight + 0.35) / 0.70, 0.0, 1.0);
    vec3 col = mix(deep, shallow, t);
    float foam = smoothstep(0.23, 0.36, vHeight);
    col = mix(col, vec3(0.92, 0.97, 1.00), foam * 0.58);
    /* horizon fade */
    float fade = clamp(vUv.y * 2.0, 0.0, 1.0);
    col = mix(vec3(0.55, 0.38, 0.22), col, fade);
    gl_FragColor = vec4(col, 0.91);
  }
`;

function Ocean() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useRef({ uTime: { value: 0 } });
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.55, 5]} renderOrder={1}>
      <planeGeometry args={[80, 24, 100, 50]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={WATER_VERT}
        fragmentShader={WATER_FRAG}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

/* ─── Sigiriya Rock ─── */
function SigiriyaRock() {
  const bodyGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.00,  0.0),
      new THREE.Vector2(2.80,  0.3),
      new THREE.Vector2(3.20,  1.3),
      new THREE.Vector2(3.00,  3.5),
      new THREE.Vector2(2.70,  6.0),
      new THREE.Vector2(2.40,  8.5),
      new THREE.Vector2(2.52,  9.8),
      new THREE.Vector2(2.50, 11.0),
      new THREE.Vector2(2.55, 11.5),
      new THREE.Vector2(0.00, 11.5),
    ];
    return new THREE.LatheGeometry(pts, 22);
  }, []);

  const ridgeGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.14, 11.5, 1, 22);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(y * 0.55) * 0.09 + 0.02);
    }
    return g;
  }, []);

  return (
    <group position={[4, -2.6, -28]}>
      {/* Main rock column */}
      <mesh geometry={bodyGeo} castShadow>
        <meshStandardMaterial color="#7B3318" roughness={0.88} metalness={0.04} />
      </mesh>

      {/* Vertical ridge details */}
      {[0, 1.0, 2.0, 3.14, 4.2, 5.2].map((a, i) => (
        <mesh
          key={i}
          geometry={ridgeGeo}
          position={[Math.sin(a) * 2.7, 5.75, Math.cos(a) * 2.7]}
          rotation={[0, a, 0]}
        >
          <meshStandardMaterial color="#5A2010" roughness={0.95} />
        </mesh>
      ))}

      {/* Summit plateau */}
      <mesh position={[0, 11.7, 0]}>
        <cylinderGeometry args={[2.56, 2.56, 0.40, 20]} />
        <meshStandardMaterial color="#2B5C1A" roughness={0.88} />
      </mesh>

      {/* Palace silhouette on summit */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 12.3, 0]}>
          <boxGeometry args={[0.55, 0.85, 0.55]} />
          <meshStandardMaterial color="#3A2010" roughness={0.92} />
        </mesh>
      ))}

      {/* Jungle base */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[4.2, 3.2, 1.4, 18]} />
        <meshStandardMaterial color="#1E5812" roughness={0.92} />
      </mesh>

      {/* Base mist */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[5.0, 4.0, 0.8, 18]} />
        <meshBasicMaterial
          color="#FFD8A0"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Tea plantation terrace ─── */
function TeaTerrace({ z, offsetX = 0 }: { z: number; offsetX?: number }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(55, 10, 80, 28);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) + offsetX;
      const y = pos.getY(i);
      const slope = y * 0.28;
      const rows  = Math.sin(y * 3.0) * 0.14 * (1 + Math.sin(y * 0.4) * 0.25);
      const roll  = Math.sin(x * 0.22 + 0.5) * 0.45 + Math.sin(x * 0.55 + 1.3) * 0.22;
      pos.setZ(i, slope + rows + roll);
    }
    g.computeVertexNormals();
    return g;
  }, [offsetX]);

  return (
    <mesh geometry={geo} position={[0, -2.2, z]}>
      <meshStandardMaterial color="#2D6830" roughness={0.90} metalness={0.01} />
    </mesh>
  );
}

/* ─── Mountain silhouette layer ─── */
type MountainProps = {
  z: number; color: string; height: number;
  offsetX?: number; width?: number; opacity?: number;
};

function MountainLayer({ z, color, height, offsetX = 0, width = 80, opacity = 1 }: MountainProps) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, 16, 260, 1);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) + offsetX;
      const y = pos.getY(i);
      const peak =
        Math.sin(x * 0.17 + 1.1) * height * 0.42 +
        Math.sin(x * 0.39 + 2.4) * height * 0.28 +
        Math.sin(x * 0.88 + 0.6) * height * 0.17 +
        Math.sin(x * 1.90 + 1.7) * height * 0.09 +
        Math.sin(x * 4.20 + 0.4) * height * 0.04;
      pos.setY(i, y + peak);
    }
    g.computeVertexNormals();
    return g;
  }, [height, width, offsetX]);

  return (
    <mesh geometry={geo} position={[0, -2.2, z]}>
      <meshStandardMaterial
        color={color}
        roughness={0.88}
        metalness={0.02}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

/* ─── Palm tree — animated crown sway ─── */
type PalmProps = { position: [number, number, number]; lean?: number };

function PalmTree({ position, lean = 0 }: PalmProps) {
  const crownRef = useRef<THREE.Group>(null);

  const trunkGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.065, 0.17, 4.4, 8);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getY(i) + 2.2) / 4.4;
      pos.setX(i, pos.getX(i) + t * t * lean * 1.5);
      pos.setZ(i, pos.getZ(i) + Math.sin(t * Math.PI) * lean * 0.3);
    }
    g.computeVertexNormals();
    return g;
  }, [lean]);

  useFrame(({ clock }) => {
    if (!crownRef.current) return;
    const t  = clock.getElapsedTime();
    const sp = 0.65 + Math.abs(lean) * 0.4;
    const am = 0.055 + Math.abs(lean) * 0.025;
    crownRef.current.rotation.z = Math.sin(t * sp + position[0] * 0.7) * am;
    crownRef.current.rotation.x = Math.sin(t * sp * 0.75 + position[2] * 0.5) * am * 0.45;
  });

  const topOffset = lean * 1.5;
  const frondCount = 9;

  return (
    <group position={position}>
      <mesh geometry={trunkGeo} position={[0, 2.2, 0]} castShadow>
        <meshStandardMaterial color="#7A5C18" roughness={0.93} />
      </mesh>

      {/* Animated crown */}
      <group ref={crownRef} position={[topOffset, 4.45, 0]}>
        {Array.from({ length: frondCount }).map((_, i) => {
          const angle  = (i / frondCount) * Math.PI * 2;
          const droop  = 0.28 + (i % 3) * 0.06;
          const length = 1.90 + (i % 2) * 0.28;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh
                position={[length * 0.55, -droop * length * 0.6, 0]}
                rotation={[0, 0, -droop * Math.PI * 0.55]}
              >
                <planeGeometry args={[length, 0.24, 5, 1]} />
                <meshStandardMaterial
                  color="#1D5C0A"
                  side={THREE.DoubleSide}
                  roughness={0.78}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ─── Cloud wisps ─── */
type PuffProps = { position: [number, number, number]; scale: number; phase: number };

function CloudPuff({ position, scale, phase }: PuffProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * 0.028 + phase) * 3;
  });

  const blobs: [number, number, number, number][] = [
    [0.0,  0.0,  0.0,  1.0],
    [1.3,  0.3,  0.0,  0.80],
    [-1.1, 0.25, 0.0,  0.75],
    [0.6, -0.2,  0.55, 0.70],
    [-0.5, 0.45, -0.4, 0.65],
    [0.0,  0.55, 0.2,  0.55],
  ];

  return (
    <group ref={ref} position={position}>
      {blobs.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x * scale, y * scale, z * scale]}>
          <sphereGeometry args={[s * scale, 7, 5]} />
          <meshBasicMaterial
            color="#FFEEDD"
            transparent
            opacity={0.072}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CloudLayer() {
  return (
    <group>
      <CloudPuff position={[-20,  8.5, -22]} scale={2.6} phase={0.0} />
      <CloudPuff position={[ 14, 10.0, -30]} scale={3.4} phase={1.5} />
      <CloudPuff position={[ -6,  9.0, -38]} scale={2.2} phase={3.1} />
      <CloudPuff position={[ 28,  7.5, -24]} scale={2.9} phase={4.3} />
      <CloudPuff position={[-32, 11.0, -20]} scale={2.4} phase={2.2} />
      <CloudPuff position={[  5, 12.0, -42]} scale={4.0} phase={5.8} />
    </group>
  );
}

/* ─── Sandy beach ─── */
function Beach() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 12, 90, 35);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.9 + y * 0.6) * 0.022 + Math.sin(x * 2.1) * 0.01);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.57, 3]} renderOrder={2}>
      <meshStandardMaterial color="#C8A96A" roughness={0.96} metalness={0.0} />
    </mesh>
  );
}

/* ─── Tea-green mid ground ─── */
function GrassGround() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(90, 24, 120, 60);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i,
        Math.sin(x * 0.60 + y * 0.40) * 0.18 +
        Math.sin(x * 1.40 + y * 0.90) * 0.09 +
        Math.sin(x * 3.00 + y * 2.10) * 0.04,
      );
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.62, -4]}>
      <meshStandardMaterial color="#3D6B2A" roughness={0.92} metalness={0.0} />
    </mesh>
  );
}

/* ─── Mist particles ─── */
function MistParticles({ count = 280 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 50;
      arr[i * 3 + 1] = Math.random() * 5 - 1.5;
      arr[i * 3 + 2] = (Math.random() * 28 + 2) * -1;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.position.x = Math.sin(t * 0.06) * 0.4;
    pointsRef.current.position.y = Math.sin(t * 0.09) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#FFE8C8" transparent opacity={0.32} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Mist veils ─── */
function MistVeil({ position, opacity }: { position: [number, number, number]; opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.x += Math.sin(t * 0.04 + position[2]) * 0.002;
    meshRef.current.position.y += Math.sin(t * 0.06 + position[0]) * 0.001;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[18, 5, 1, 1]} />
      <meshBasicMaterial color="#FFD8A0" transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ─── Procedural mountain fallback (used when GLB is missing) ─── */
function ProceduralMountains() {
  return (
    <>
      <MountainLayer z={-34} color="#1A2A5A" height={8.0} offsetX={ 2}   width={92} opacity={0.88} />
      <MountainLayer z={-24} color="#22364E" height={6.5} offsetX={-3}   width={82} opacity={0.92} />
      <MountainLayer z={-16} color="#28482E" height={5.6} offsetX={ 1.5} width={76} opacity={0.95} />
      <MountainLayer z={-11} color="#2F5636" height={4.8} offsetX={-1}   width={70} />
    </>
  );
}

/* ─── Procedural terrain fallback (used when earth GLB is missing) ─── */
function ProceduralTerrain() {
  return (
    <>
      <TeaTerrace z={-7} offsetX={ 2} />
      <TeaTerrace z={-4} offsetX={-1.5} />
      <GrassGround />
    </>
  );
}

/* ─── Main scene ─── */
export function ModelLoader() {
  return (
    <group>
      <SkyDome />
      <SunDisc />
      <CloudLayer />

      {/* Sigiriya monolith — far right background */}
      <SigiriyaRock />

      {/*
        GLB mountains — place public/models/mountains.glb in your project.
        Download from: https://mont-fort.com/assets/models/mountains.glb
        Falls back to procedural layers automatically if file is missing.
      */}
      <SafeGLBModel
        url="/models/mountains.glb"
        position={[0, -3, -18]}
        rotation={[0, 0, 0]}
        scale={0.045}
        fallback={<ProceduralMountains />}
      />

      {/*
        GLB earth/terrain — place public/models/earth-min.glb in your project.
        Download from: https://mont-fort.com/assets/models/homepage/earth-min.glb
        Falls back to procedural terraces + grass automatically if file is missing.
      */}
      <SafeGLBModel
        url="/models/earth-min.glb"
        position={[0, -3, -8]}
        rotation={[0, 0, 0]}
        scale={0.06}
        fallback={<ProceduralTerrain />}
      />

      {/* Ground: green mid + sand near */}
      <GrassGround />
      <Beach />

      {/* Indian Ocean */}
      <Ocean />

      {/* Coconut palms — animated sway */}
      <PalmTree position={[-5.5, -2.6,  6]} lean={ 0.18} />
      <PalmTree position={[ 4.2, -2.6,  7]} lean={-0.14} />
      <PalmTree position={[-1.5, -2.6,  5]} lean={ 0.08} />
      <PalmTree position={[ 7.8, -2.6,  5]} lean={ 0.22} />
      <PalmTree position={[-8.5, -2.6,  8]} lean={-0.12} />
      <PalmTree position={[ 1.8, -2.6,  9]} lean={ 0.05} />
      <PalmTree position={[-12,  -2.6,  6]} lean={-0.18} />

      {/* Atmosphere */}
      <MistVeil position={[-6,  0.5, -12]} opacity={0.055} />
      <MistVeil position={[ 4, -0.2, -20]} opacity={0.048} />
      <MistVeil position={[-2,  1.0, -26]} opacity={0.038} />
      <MistParticles count={280} />
    </group>
  );
}
