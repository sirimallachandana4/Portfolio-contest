import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Interactive3DOrbProps {
  mousePos: { x: number; y: number };
  variant?: 'hero' | 'about';
}

export const Interactive3DOrb: React.FC<Interactive3DOrbProps> = ({ mousePos, variant = 'hero' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1b2b, 2.5);
    scene.add(ambientLight);

    const tealLight = new THREE.PointLight(0x2dd4bf, 5.0, 15);
    tealLight.position.set(2, 3, 2);
    scene.add(tealLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4.5, 15);
    purpleLight.position.set(-2, -2, 2);
    scene.add(purpleLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 2. Central Icosahedron Crystal with Glass/Iridescent Shader Material
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x0d9488,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 3. Wireframe Overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.07, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 4. Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.95, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.25, 0.008, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.3,
      metalness: 0.8
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    coreGroup.add(ring3);

    // 5. Cloud of Satellite Particle Dots (Quantum Data Swarm)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 6. Floating Satellites
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.9
    });

    const satCount = 4;
    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      coreGroup.add(sat);
      satellites.push(sat);
    }

    let animationId: number;
    let clock = new THREE.Clock();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const targetRotX = mouseRef.current.y * 0.4;
      const targetRotY = mouseRef.current.x * 0.5;

      coreGroup.rotation.x = THREE.MathUtils.lerp(coreGroup.rotation.x, targetRotX + elapsed * 0.15, delta * 3);
      coreGroup.rotation.y = THREE.MathUtils.lerp(coreGroup.rotation.y, targetRotY + elapsed * 0.25, delta * 3);

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      ring3.rotation.y += 0.005;

      coreMesh.rotation.y = -elapsed * 0.2;
      wireMesh.rotation.y = -elapsed * 0.2;

      particles.rotation.y = elapsed * 0.1;
      particles.rotation.x = Math.sin(elapsed * 0.3) * 0.1;

      satellites.forEach((sat, index) => {
        const speed = 1.2 + index * 0.3;
        const angle = elapsed * speed + (index * Math.PI * 2) / satCount;
        const orbitRadius = 1.8 + Math.sin(elapsed + index) * 0.15;
        sat.position.set(
          Math.cos(angle) * orbitRadius,
          Math.sin(angle * 1.5) * 0.5,
          Math.sin(angle) * orbitRadius
        );
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      satGeo.dispose();
      satMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center pointer-events-none select-none ${
        variant === 'about' ? 'max-w-md mx-auto' : ''
      }`}
    />
  );
};
