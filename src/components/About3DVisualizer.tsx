import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface About3DVisualizerProps {
  mousePos: { x: number; y: number };
}

export const About3DVisualizer: React.FC<About3DVisualizerProps> = ({ mousePos }) => {
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
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Dual Cyber Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0x0a101f, 3.0);
    scene.add(ambientLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 6.0, 20);
    tealLight.position.set(3, 3, 3);
    scene.add(tealLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 5.5, 20);
    violetLight.position.set(-3, -3, 3);
    scene.add(violetLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    cyanLight.position.set(0, 5, 2);
    scene.add(cyanLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. Center: Quantum Monolith Tesseract (Outer wireframe cube + inner rotating octahedron core)
    const cubeGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cubeWireMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const cubeWire = new THREE.Mesh(cubeGeo, cubeWireMat);
    mainGroup.add(cubeWire);

    // Inner Glass Monolith with Emerald-Teal Core
    const innerCoreGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x090d16,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    mainGroup.add(innerCore);

    // Secondary Wireframe for Octahedron Core
    const coreWireGeo = new THREE.OctahedronGeometry(0.88, 0);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    mainGroup.add(coreWire);

    // 3. Double-Helix Data Strand Columns (Vertical genetic code of CS & algorithms)
    const helixGroup = new THREE.Group();
    mainGroup.add(helixGroup);

    const helixCount = 28;
    const helixRadius = 1.35;
    const helixHeight = 3.2;
    const helixNodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const helixMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });
    const helixMat2 = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });

    const strandNodes: { mesh: THREE.Mesh; baseAngle: number; y: number; strand: number }[] = [];

    for (let i = 0; i < helixCount; i++) {
      const progress = i / helixCount;
      const y = (progress - 0.5) * helixHeight;
      const angle = progress * Math.PI * 4; // 2 full turns

      // Strand A
      const nodeA = new THREE.Mesh(helixNodeGeo, helixMat1);
      nodeA.position.set(Math.cos(angle) * helixRadius, y, Math.sin(angle) * helixRadius);
      helixGroup.add(nodeA);
      strandNodes.push({ mesh: nodeA, baseAngle: angle, y, strand: 0 });

      // Strand B (opposite 180 degrees)
      const nodeB = new THREE.Mesh(helixNodeGeo, helixMat2);
      nodeB.position.set(Math.cos(angle + Math.PI) * helixRadius, y, Math.sin(angle + Math.PI) * helixRadius);
      helixGroup.add(nodeB);
      strandNodes.push({ mesh: nodeB, baseAngle: angle + Math.PI, y, strand: 1 });

      // Cross-linking algorithmic bridge rungs every 2 steps
      if (i % 2 === 0) {
        const rungGeo = new THREE.CylinderGeometry(0.008, 0.008, helixRadius * 2, 6);
        const rungMat = new THREE.MeshBasicMaterial({
          color: 0x5eead4,
          transparent: true,
          opacity: 0.35
        });
        const rung = new THREE.Mesh(rungGeo, rungMat);
        rung.position.set(0, y, 0);
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = -angle;
        helixGroup.add(rung);
      }
    }

    // 4. Concentric Gyroscopic Tech Chronometer Rings (Gimbal Armatures)
    const gyroRing1Geo = new THREE.TorusGeometry(2.1, 0.02, 16, 80);
    const gyroRing1Mat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x0f766e,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.85
    });
    const gyroRing1 = new THREE.Mesh(gyroRing1Geo, gyroRing1Mat);
    mainGroup.add(gyroRing1);

    const gyroRing2Geo = new THREE.TorusGeometry(2.4, 0.015, 16, 80);
    const gyroRing2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.85
    });
    const gyroRing2 = new THREE.Mesh(gyroRing2Geo, gyroRing2Mat);
    mainGroup.add(gyroRing2);

    // 5. Floating Hexagonal CS Skill Runes / Beacons
    const floatingBadges: THREE.Mesh[] = [];
    const hexGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 6);
    const hexMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      emissive: 0x0d9488,
      emissiveIntensity: 1.0,
      metalness: 0.9,
      roughness: 0.2
    });

    for (let i = 0; i < 6; i++) {
      const hex = new THREE.Mesh(hexGeo, hexMat);
      mainGroup.add(hex);
      floatingBadges.push(hex);
    }

    // 6. Particle Matrix Stream
    const matrixCount = 180;
    const matrixGeo = new THREE.BufferGeometry();
    const matrixPositions = new Float32Array(matrixCount * 3);

    for (let i = 0; i < matrixCount; i++) {
      matrixPositions[i * 3] = (Math.random() - 0.5) * 5;
      matrixPositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      matrixPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    matrixGeo.setAttribute('position', new THREE.BufferAttribute(matrixPositions, 3));
    const matrixMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(matrixGeo, matrixMat);
    mainGroup.add(particleField);

    let animationId: number;
    const clock = new THREE.Clock();

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

      // Smooth interactive mouse parallax
      const targetRotX = mouseRef.current.y * 0.45;
      const targetRotY = mouseRef.current.x * 0.55;

      mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, targetRotX, delta * 3.5);
      mainGroup.rotation.y = THREE.MathUtils.lerp(mainGroup.rotation.y, targetRotY, delta * 3.5);

      // Rotate Tesseract Cube & Core opposite to each other
      cubeWire.rotation.x = elapsed * 0.4;
      cubeWire.rotation.y = elapsed * 0.5;
      cubeWire.rotation.z = Math.sin(elapsed * 0.3) * 0.2;

      innerCore.rotation.x = -elapsed * 0.6;
      innerCore.rotation.y = -elapsed * 0.7;
      coreWire.rotation.x = -elapsed * 0.6;
      coreWire.rotation.y = -elapsed * 0.7;

      // Pulse Core Scale slightly
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);
      coreWire.scale.set(pulse * 1.02, pulse * 1.02, pulse * 1.02);

      // Rotate Vertical Double-Helix Strands
      helixGroup.rotation.y = elapsed * 0.6;

      // Gyroscopic Ring Rotations on Independent Gimbal Axes
      gyroRing1.rotation.x = elapsed * 0.5;
      gyroRing1.rotation.y = Math.sin(elapsed * 0.4) * 0.8;

      gyroRing2.rotation.y = -elapsed * 0.4;
      gyroRing2.rotation.z = Math.cos(elapsed * 0.3) * 0.8;

      // Orbit Hexagonal Badges in 3D Wave
      floatingBadges.forEach((hex, idx) => {
        const angle = elapsed * 0.7 + (idx * Math.PI * 2) / floatingBadges.length;
        const orbitRadius = 1.95 + Math.sin(elapsed * 1.5 + idx) * 0.2;
        const yPos = Math.sin(angle * 2) * 0.8;

        hex.position.set(Math.cos(angle) * orbitRadius, yPos, Math.sin(angle) * orbitRadius);
        hex.rotation.x += 0.02;
        hex.rotation.y += 0.03;
        hex.rotation.z += 0.01;
      });

      // Slowly rotate particle field
      particleField.rotation.y = elapsed * 0.05;

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
      cubeGeo.dispose();
      cubeWireMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      helixNodeGeo.dispose();
      helixMat1.dispose();
      helixMat2.dispose();
      gyroRing1Geo.dispose();
      gyroRing1Mat.dispose();
      gyroRing2Geo.dispose();
      gyroRing2Mat.dispose();
      hexGeo.dispose();
      hexMat.dispose();
      matrixGeo.dispose();
      matrixMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] max-w-md mx-auto flex items-center justify-center pointer-events-none select-none"
    />
  );
};
