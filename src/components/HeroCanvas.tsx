import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';

/* Sri Lanka destination images — 6 cards in 3D space */
const CARDS = [
  {
    url: 'https://images.unsplash.com/photo-1583109193439-2e7d5e51e42a?w=900&q=85&auto=format&fit=crop',
    label: 'Sigiriya',
    x: 2.6,  y: 0.4,  z: 0.2,  ry: -0.08, opacity: 0.93,
  },
  {
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=900&q=85&auto=format&fit=crop',
    label: 'Yala',
    x: 3.8,  y: -0.9, z: -0.8, ry: -0.14, opacity: 0.82,
  },
  {
    url: 'https://images.unsplash.com/photo-1586861203927-800a5acdce4d?w=900&q=85&auto=format&fit=crop',
    label: 'Ella',
    x: 2.4,  y: 1.8,  z: -1.4, ry:  0.06, opacity: 0.75,
  },
  {
    url: 'https://images.unsplash.com/photo-1559592413-7cbb3e8c4c7b?w=900&q=85&auto=format&fit=crop',
    label: 'Mirissa',
    x: -3.4, y: -0.6, z: -2.0, ry:  0.10, opacity: 0.60,
  },
  {
    url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=900&q=85&auto=format&fit=crop',
    label: 'Galle',
    x: -2.6, y: 1.2,  z: -3.0, ry: -0.07, opacity: 0.50,
  },
  {
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f28f3316?w=900&q=85&auto=format&fit=crop',
    label: 'Kandy',
    x:  0.6, y: 2.6,  z: -3.5, ry:  0.04, opacity: 0.42,
  },
];

const CARD_W = 1.72;
const CARD_H = 1.08;

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Scene ── */
    const scene  = new THREE.Scene();
    const w      = el.clientWidth;
    const h      = el.clientHeight;

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 60);
    camera.position.set(0, 0, 7);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Group ── */
    const group = new THREE.Group();
    scene.add(group);

    /* ── Cards ── */
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    const disposals: (() => void)[] = [];

    CARDS.forEach((card, i) => {
      loader.load(card.url, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;

        const geo = new THREE.PlaneGeometry(CARD_W, CARD_H);
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0,
        });
        const mesh = new THREE.Mesh(geo, mat);

        mesh.position.set(card.x, card.y, card.z);
        mesh.rotation.y = card.ry;
        mesh.rotation.x = (Math.random() - 0.5) * 0.05;
        group.add(mesh);

        disposals.push(() => {
          geo.dispose();
          tex.dispose();
          mat.dispose();
        });

        /* Fade in staggered */
        gsap.to(mat, {
          opacity: card.opacity,
          duration: 1.4,
          delay: 0.3 + i * 0.18,
          ease: 'power2.out',
        });

        /* Continuous float */
        gsap.to(mesh.position, {
          y: card.y + 0.20,
          duration: 2.8 + Math.random() * 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2.5,
        });

        /* Subtle slow tilt */
        gsap.to(mesh.rotation, {
          z: (Math.random() - 0.5) * 0.06,
          duration: 4 + Math.random() * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3,
        });
      });
    });

    /* ── Scroll: group drifts back + rotates ── */
    gsap.to(group.rotation, {
      y: 0.28,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '45vh top',
        scrub: 2,
      },
    });
    gsap.to(group.position, {
      z: -2.5,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '45vh top',
        scrub: 2,
      },
    });

    /* ── Mouse parallax ── */
    const mouse  = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 1.4;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.9;
    };
    window.addEventListener('mousemove', onMove);

    /* ── Render loop ── */
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      smooth.x += (mouse.x - smooth.x) * 0.038;
      smooth.y += (mouse.y - smooth.y) * 0.038;
      camera.position.x = smooth.x * 0.55;
      camera.position.y = smooth.y * 0.35;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    /* ── Resize ── */
    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      disposals.forEach((fn) => fn());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
