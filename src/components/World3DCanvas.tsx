import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface World3DCanvasProps {
  activeSection: string;
  mousePos: { x: number; y: number };
}

export const World3DCanvas: React.FC<World3DCanvasProps> = ({
  activeSection,
  mousePos
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef<string>(activeSection);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080c, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x1d1430, 2.0);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 4.0, 30);
    purplePointLight.position.set(4, 5, 4);
    scene.add(purplePointLight);

    const bluePointLight = new THREE.PointLight(0x6366f1, 3.0, 30);
    bluePointLight.position.set(-4, -3, 3);
    scene.add(bluePointLight);

    const topDirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topDirectionalLight.position.set(0, 8, 5);
    scene.add(topDirectionalLight);

    // ==========================================
    // 2. AMBIENT PARTICLES (Celestial Stardust)
    // ==========================================
    const particleCount = prefersReducedMotion ? 250 : 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 30;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ==========================================
    // 3. BACKGROUND SPATIAL GEOMETRIES
    // ==========================================
    const spatialGroup = new THREE.Group();
    scene.add(spatialGroup);

    // Crystal Prism Core
    const crystalGeo = new THREE.OctahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x18142b,
      emissive: 0x2e1065,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.9,
      wireframe: false
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalMesh.position.set(0, 0, -1);
    spatialGroup.add(crystalMesh);

    // Outer Wireframe Gyroscope Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.015, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.45
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    spatialGroup.add(ring1);

    // Outer Wireframe Ring 2
    const ring2Geo = new THREE.TorusGeometry(3.0, 0.01, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    spatialGroup.add(ring2);

    // Floating Geodesic Nodes (Skills Cosmos)
    const nodeGroup = new THREE.Group();
    spatialGroup.add(nodeGroup);

    const nodeCount = 8;
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.IcosahedronGeometry(0.18, 1);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xd8b4fe,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.8, Math.sin(angle) * radius);
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    // Grid Floor Horizon
    const gridHelper = new THREE.GridHelper(36, 36, 0x581c87, 0x1f1938);
    gridHelper.position.y = -3.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    scene.add(gridHelper);

    // ==========================================
    // 4. CAMERA WAYPOINTS FOR SECTIONS
    // ==========================================
    interface CameraWaypoint {
      pos: THREE.Vector3;
      lookAt: THREE.Vector3;
      crystalPos: THREE.Vector3;
      crystalScale: number;
      groupRotSpeed: number;
    }

    const waypoints: Record<string, CameraWaypoint> = {
      home: {
        pos: new THREE.Vector3(0, 0.1, 5.2),
        lookAt: new THREE.Vector3(0, 0, 0),
        crystalPos: new THREE.Vector3(1.6, 0.2, -0.5),
        crystalScale: 0.85,
        groupRotSpeed: 0.08
      },
      about: {
        pos: new THREE.Vector3(-1.2, 0.2, 4.4),
        lookAt: new THREE.Vector3(0.4, 0, 0),
        crystalPos: new THREE.Vector3(2.2, 0, -1.2),
        crystalScale: 0.95,
        groupRotSpeed: 0.05
      },
      skills: {
        pos: new THREE.Vector3(0, 0.5, 4.2),
        lookAt: new THREE.Vector3(0, 0, 0),
        crystalPos: new THREE.Vector3(0, 0, 0),
        crystalScale: 1.15,
        groupRotSpeed: 0.18
      },
      projects: {
        pos: new THREE.Vector3(1.2, -0.2, 4.6),
        lookAt: new THREE.Vector3(-0.4, 0, 0),
        crystalPos: new THREE.Vector3(-2.2, 0.4, -1.5),
        crystalScale: 0.75,
        groupRotSpeed: 0.06
      },
      education: {
        pos: new THREE.Vector3(-0.6, 0.6, 4.8),
        lookAt: new THREE.Vector3(0, -0.2, 0),
        crystalPos: new THREE.Vector3(0, -0.8, -2.0),
        crystalScale: 0.8,
        groupRotSpeed: 0.07
      },
      achievements: {
        pos: new THREE.Vector3(0, -0.4, 4.5),
        lookAt: new THREE.Vector3(0, 0.1, 0),
        crystalPos: new THREE.Vector3(0, 0.8, -1.5),
        crystalScale: 0.9,
        groupRotSpeed: 0.1
      },
      certifications: {
        pos: new THREE.Vector3(0, -0.4, 4.5),
        lookAt: new THREE.Vector3(0, 0.1, 0),
        crystalPos: new THREE.Vector3(0, 0.8, -1.5),
        crystalScale: 0.9,
        groupRotSpeed: 0.1
      },
      contact: {
        pos: new THREE.Vector3(0, 0, 5.0),
        lookAt: new THREE.Vector3(0, 0, 0),
        crystalPos: new THREE.Vector3(0, -0.2, -1.8),
        crystalScale: 0.65,
        groupRotSpeed: 0.04
      }
    };

    // Current camera and target states for smooth lerping
    const currentPos = new THREE.Vector3(0, 0, 5.2);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const currentCrystalPos = new THREE.Vector3(0, 0, 0);

    // ==========================================
    // 5. ANIMATION LOOP & RESIZE
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const active = activeSectionRef.current || 'home';
      const targetWaypoint = waypoints[active] || waypoints.home;

      if (!prefersReducedMotion) {
        // Subtle mouse parallax offset
        const mouseX = mouseRef.current.x * 0.35;
        const mouseY = mouseRef.current.y * 0.25;

        // Smooth camera position interpolation
        const destPos = new THREE.Vector3(
          targetWaypoint.pos.x + mouseX * 0.5,
          targetWaypoint.pos.y + mouseY * 0.3,
          targetWaypoint.pos.z
        );
        currentPos.lerp(destPos, delta * 3.0);
        camera.position.copy(currentPos);

        // Smooth LookAt interpolation
        const destLookAt = new THREE.Vector3(
          targetWaypoint.lookAt.x + mouseX * 0.2,
          targetWaypoint.lookAt.y + mouseY * 0.1,
          targetWaypoint.lookAt.z
        );
        currentLookAt.lerp(destLookAt, delta * 3.0);
        camera.lookAt(currentLookAt);

        // Crystal position and rotation
        currentCrystalPos.lerp(targetWaypoint.crystalPos, delta * 2.5);
        crystalMesh.position.copy(currentCrystalPos);

        const currentScale = crystalMesh.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetWaypoint.crystalScale, delta * 2.5);
        crystalMesh.scale.set(newScale, newScale, newScale);

        // Rotations
        crystalMesh.rotation.y = elapsed * 0.3;
        crystalMesh.rotation.x = Math.sin(elapsed * 0.4) * 0.2;

        ring1.rotation.z += 0.005;
        ring2.rotation.z -= 0.004;

        nodeGroup.rotation.y = elapsed * targetWaypoint.groupRotSpeed;

        // Orbit nodes gentle floating pulsation
        nodeMeshes.forEach((mesh, idx) => {
          mesh.position.y = Math.sin(elapsed * 2 + idx) * 0.2;
        });

        // Drift particle system slowly
        particleSystem.rotation.y = elapsed * 0.015;
        particleSystem.rotation.x = Math.sin(elapsed * 0.01) * 0.05;
      } else {
        camera.position.copy(targetWaypoint.pos);
        camera.lookAt(targetWaypoint.lookAt);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ringMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      id="world_3d_canvas_container"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
