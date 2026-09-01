import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { portfolioData, SkillItem } from '../data/portfolio';
import { createSkillSphereTexture } from '../utils/skillTextures';
import { Sparkles, ArrowRight, X, CheckCircle2, Code2, Layers, Cpu, Terminal, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';

interface SphereConfig {
  skill: SkillItem;
  basePos: [number, number, number];
  radius: number;
  floatSpeed: number;
  floatAmp: number;
  rotSpeed: number;
  isPrimaryCluster: boolean;
  scatterOffset: [number, number, number];
}

interface Skills3DSceneProps {
  onBackToOrbit: () => void;
  onNavigateProjects?: () => void;
}

export const Skills3DScene: React.FC<Skills3DSceneProps> = ({
  onBackToOrbit,
  onNavigateProjects
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  // References for live 3D animation loop
  const selectedSkillRef = useRef<SkillItem | null>(null);
  const hoveredSkillRef = useRef<SkillItem | null>(null);
  const filterRef = useRef<string>('all');
  const mouseScreenRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isTransitioningRef = useRef<boolean>(false);

  useEffect(() => {
    selectedSkillRef.current = selectedSkill;
  }, [selectedSkill]);

  useEffect(() => {
    hoveredSkillRef.current = hoveredSkill;
  }, [hoveredSkill]);

  useEffect(() => {
    filterRef.current = activeCategoryFilter;
  }, [activeCategoryFilter]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioningOut;
  }, [isTransitioningOut]);

  // Exact skills from portfolio mapped to organic 3D cluster & satellite configurations
  const sphereConfigs: SphereConfig[] = [
    // --- Core Programming Cluster ---
    {
      skill: portfolioData.skills.find((s) => s.name === 'Java') || portfolioData.skills[1],
      basePos: [0.75, 0.45, 0.4],
      radius: 0.56,
      floatSpeed: 1.1,
      floatAmp: 0.08,
      rotSpeed: 0.22,
      isPrimaryCluster: true,
      scatterOffset: [2.5, 2.0, 1.2]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'Python') || portfolioData.skills[2],
      basePos: [-0.15, 0.85, -0.05],
      radius: 0.52,
      floatSpeed: 1.4,
      floatAmp: 0.06,
      rotSpeed: -0.18,
      isPrimaryCluster: true,
      scatterOffset: [-2.0, 2.5, 0.8]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'C') || portfolioData.skills[0],
      basePos: [1.65, -0.1, 0.15],
      radius: 0.50,
      floatSpeed: 1.0,
      floatAmp: 0.07,
      rotSpeed: 0.16,
      isPrimaryCluster: true,
      scatterOffset: [3.2, -1.5, 1.0]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'DSA Solving') || portfolioData.skills[3],
      basePos: [0.7, -0.75, 0.25],
      radius: 0.48,
      floatSpeed: 1.3,
      floatAmp: 0.05,
      rotSpeed: -0.2,
      isPrimaryCluster: true,
      scatterOffset: [1.8, -3.0, 0.5]
    },

    // --- Web Programming Cluster ---
    {
      skill: portfolioData.skills.find((s) => s.name === 'React.js') || portfolioData.skills[8],
      basePos: [-1.05, 0.35, -0.08],
      radius: 0.54,
      floatSpeed: 1.25,
      floatAmp: 0.07,
      rotSpeed: 0.2,
      isPrimaryCluster: true,
      scatterOffset: [-3.0, 1.2, 0.6]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'JavaScript') || portfolioData.skills[6],
      basePos: [-0.25, -0.15, 0.22],
      radius: 0.46,
      floatSpeed: 1.5,
      floatAmp: 0.06,
      rotSpeed: -0.14,
      isPrimaryCluster: true,
      scatterOffset: [-1.8, -1.8, 1.5]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'HTML') || portfolioData.skills[4],
      basePos: [-0.35, -0.9, -0.12],
      radius: 0.42,
      floatSpeed: 1.35,
      floatAmp: 0.05,
      rotSpeed: -0.16,
      isPrimaryCluster: true,
      scatterOffset: [-1.2, -3.2, -0.5]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'CSS') || portfolioData.skills[5],
      basePos: [1.85, 0.85, -0.2],
      radius: 0.44,
      floatSpeed: 0.95,
      floatAmp: 0.08,
      rotSpeed: 0.18,
      isPrimaryCluster: true,
      scatterOffset: [3.5, 2.2, -0.8]
    },

    // --- Libraries & Frameworks (Data & Backend) Satellites ---
    {
      skill: portfolioData.skills.find((s) => s.name === 'Node.js') || portfolioData.skills[9],
      basePos: [-2.15, 1.2, -0.45],
      radius: 0.42,
      floatSpeed: 0.85,
      floatAmp: 0.12,
      rotSpeed: 0.14,
      isPrimaryCluster: false,
      scatterOffset: [-4.0, 2.8, -1.2]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'Pandas') || portfolioData.skills[10],
      basePos: [-2.55, -0.65, 0.12],
      radius: 0.40,
      floatSpeed: 1.05,
      floatAmp: 0.1,
      rotSpeed: -0.19,
      isPrimaryCluster: false,
      scatterOffset: [-4.5, -1.8, 0.8]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'NumPy') || portfolioData.skills[11],
      basePos: [2.4, 1.5, -0.55],
      radius: 0.39,
      floatSpeed: 0.95,
      floatAmp: 0.11,
      rotSpeed: -0.15,
      isPrimaryCluster: false,
      scatterOffset: [4.2, 3.0, -1.5]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'Matplotlib') || portfolioData.skills[12],
      basePos: [2.75, -0.85, -0.38],
      radius: 0.38,
      floatSpeed: 1.15,
      floatAmp: 0.1,
      rotSpeed: 0.18,
      isPrimaryCluster: false,
      scatterOffset: [4.8, -2.0, -0.7]
    },
    {
      skill: portfolioData.skills.find((s) => s.name === 'Node') || portfolioData.skills[7],
      basePos: [-1.7, -1.4, -0.3],
      radius: 0.36,
      floatSpeed: 1.4,
      floatAmp: 0.08,
      rotSpeed: -0.16,
      isPrimaryCluster: false,
      scatterOffset: [-3.2, -3.5, -0.8]
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, High-Performance WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 7.4 : 5.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting: Key directional light + Cyan/Teal rim highlights + Purple fill
    const ambientLight = new THREE.AmbientLight(0x181e32, 2.4);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    mainKeyLight.position.set(6, 8, 7);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.0001;
    scene.add(mainKeyLight);

    // Soft Teal Rim Light
    const tealRimLight = new THREE.PointLight(0x2dd4bf, 6.0, 24);
    tealRimLight.position.set(-6, 4, 3);
    scene.add(tealRimLight);

    // Soft Purple Under-Light
    const purpleHighlightLight = new THREE.PointLight(0xc084fc, 4.5, 20);
    purpleHighlightLight.position.set(4, -5, 2.5);
    scene.add(purpleHighlightLight);

    // Subtle Cyan Fill
    const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanFillLight.position.set(0, -2, -5);
    scene.add(cyanFillLight);

    // 3. Stardust Particle System
    const particleCount = prefersReducedMotion ? 100 : 320;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // 4. Physical White 3D Spheres with MeshPhysicalMaterial
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const smoothSphereGeo = new THREE.SphereGeometry(1, 64, 48);

    interface SphereMeshState {
      mesh: THREE.Mesh;
      config: SphereConfig;
      texture: THREE.CanvasTexture;
      mat: THREE.MeshPhysicalMaterial;
      currentScale: number;
      entranceProgress: number;
      momentumOffset: THREE.Vector3;
      momentumVelocity: THREE.Vector3;
      angularMomentum: THREE.Vector3;
    }

    const sphereMeshes: SphereMeshState[] = [];

    sphereConfigs.forEach((cfg) => {
      const texture = createSkillSphereTexture(cfg.skill.name, cfg.skill.category);

      // Glossy pearl physical material with clearcoat
      const mat = new THREE.MeshPhysicalMaterial({
        map: texture,
        color: 0xffffff,
        roughness: 0.16,
        metalness: 0.08,
        clearcoat: 0.92,
        clearcoatRoughness: 0.14,
        reflectivity: 0.85,
        emissive: 0x0f2926,
        emissiveIntensity: 0.08
      });

      const mesh = new THREE.Mesh(smoothSphereGeo, mat);
      const startScale = cfg.radius * 0.1;
      mesh.scale.set(startScale, startScale, startScale);
      mesh.position.set(
        cfg.basePos[0] + cfg.scatterOffset[0],
        cfg.basePos[1] + cfg.scatterOffset[1],
        cfg.basePos[2] + cfg.scatterOffset[2]
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { skill: cfg.skill, config: cfg };

      sphereGroup.add(mesh);
      sphereMeshes.push({
        mesh,
        config: cfg,
        texture,
        mat,
        currentScale: startScale,
        entranceProgress: 0,
        momentumOffset: new THREE.Vector3(0, 0, 0),
        momentumVelocity: new THREE.Vector3(0, 0, 0),
        angularMomentum: new THREE.Vector3(0, 0, 0)
      });
    });

    // 5. Interaction Raycaster (Hover, Click, Drag & Fling)
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2();
    let isDragging = false;
    let draggedSphereIndex: number | null = null;
    const dragPlane = new THREE.Plane();
    const planeIntersect = new THREE.Vector3();
    const dragOffset = new THREE.Vector3();
    let lastDragPos = new THREE.Vector3();
    let lastDragTime = 0;

    const getEventClientCoords = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      return { clientX, clientY };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getEventClientCoords(e);
      const rect = container.getBoundingClientRect();
      mouseNorm.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(
        sphereMeshes.map((s) => s.mesh),
        false
      );

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitIdx = sphereMeshes.findIndex((s) => s.mesh === hitMesh);
        if (hitIdx !== -1) {
          isDragging = true;
          draggedSphereIndex = hitIdx;
          const hitSphere = sphereMeshes[hitIdx];

          const normal = camera.getWorldDirection(new THREE.Vector3()).negate();
          dragPlane.setFromNormalAndCoplanarPoint(normal, hitSphere.mesh.position);

          if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
            dragOffset.copy(hitSphere.mesh.position).sub(planeIntersect);
            lastDragPos.copy(hitSphere.mesh.position);
            lastDragTime = performance.now();
          }

          hitSphere.momentumVelocity.set(0, 0, 0);
          container.style.cursor = 'grabbing';
        }
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getEventClientCoords(e);
      const rect = container.getBoundingClientRect();

      mouseScreenRef.current = {
        x: (clientX / window.innerWidth) * 2 - 1,
        y: -(clientY / window.innerHeight) * 2 + 1
      };

      mouseNorm.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPos({ x: clientX, y: clientY });

      // Handle active drag
      if (isDragging && draggedSphereIndex !== null) {
        const draggedSphere = sphereMeshes[draggedSphereIndex];
        raycaster.setFromCamera(mouseNorm, camera);

        if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
          const newPos = planeIntersect.clone().add(dragOffset);
          const now = performance.now();
          const dt = Math.max((now - lastDragTime) / 1000, 0.016);

          const instVel = new THREE.Vector3().subVectors(newPos, lastDragPos).divideScalar(dt);
          draggedSphere.momentumVelocity.copy(instVel).multiplyScalar(0.7);

          draggedSphere.momentumOffset.x = newPos.x - draggedSphere.config.basePos[0];
          draggedSphere.momentumOffset.y = newPos.y - draggedSphere.config.basePos[1];
          draggedSphere.momentumOffset.z = newPos.z - draggedSphere.config.basePos[2];

          lastDragPos.copy(newPos);
          lastDragTime = now;
        }
        return;
      }

      // Hover Raycasting
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(
        sphereMeshes.map((s) => s.mesh),
        false
      );

      if (intersects.length > 0) {
        const hitSkill = intersects[0].object.userData.skill as SkillItem;
        setHoveredSkill(hitSkill);
        container.style.cursor = 'pointer';
      } else {
        setHoveredSkill(null);
        container.style.cursor = 'grab';
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (isDragging && draggedSphereIndex !== null) {
        const sphere = sphereMeshes[draggedSphereIndex];
        const now = performance.now();
        if (now - lastDragTime > 80) {
          sphere.momentumVelocity.multiplyScalar(0.2);
        }
        isDragging = false;
        draggedSphereIndex = null;
        container.style.cursor = 'grab';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(
        sphereMeshes.map((s) => s.mesh),
        false
      );

      if (intersects.length > 0) {
        const hitSkill = intersects[0].object.userData.skill as SkillItem;
        setSelectedSkill((prev) => (prev?.name === hitSkill.name ? null : hitSkill));
      } else {
        setSelectedSkill(null);
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Smooth Animation Loop & Physics Momentum Engine
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let isVisible = true;
    let sceneTime = 0;
    const prevMouse = { x: 0, y: 0 };
    const mouseVelocity = { x: 0, y: 0 };
    const tempSphereScreen = new THREE.Vector3();

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      sceneTime += delta;
      const selected = selectedSkillRef.current;
      const hovered = hoveredSkillRef.current;
      const activeFilter = filterRef.current;
      const isTransitioning = isTransitioningRef.current;

      const rawVelX = mouseScreenRef.current.x - prevMouse.x;
      const rawVelY = mouseScreenRef.current.y - prevMouse.y;
      prevMouse.x = mouseScreenRef.current.x;
      prevMouse.y = mouseScreenRef.current.y;

      mouseVelocity.x = THREE.MathUtils.lerp(mouseVelocity.x, rawVelX, 0.45);
      mouseVelocity.y = THREE.MathUtils.lerp(mouseVelocity.y, rawVelY, 0.45);
      const cursorSpeed = Math.hypot(mouseVelocity.x, mouseVelocity.y);

      if (!prefersReducedMotion) {
        const mx = mouseScreenRef.current.x * 0.45;
        const my = mouseScreenRef.current.y * 0.35;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx, delta * 3.2);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, my, delta * 3.2);
        camera.lookAt(0, 0, 0);
      }

      const entranceFactor = Math.min(sceneTime / 1.1, 1.0);
      const easeEntrance = 1 - Math.pow(1 - entranceFactor, 3);

      sphereMeshes.forEach((item, idx) => {
        const { mesh, config, mat } = item;
        const isHovered = hovered?.name === config.skill.name;
        const isSelected = selected?.name === config.skill.name;
        const matchesFilter =
          activeFilter === 'all' || config.skill.techCategory === activeFilter;

        const depthParallax = config.basePos[2] > 0.1 ? 0.35 : config.basePos[2] > -0.2 ? 0.2 : 0.08;
        const parallaxX = mouseScreenRef.current.x * depthParallax;
        const parallaxY = mouseScreenRef.current.y * depthParallax;

        if (!prefersReducedMotion && !isDragging) {
          tempSphereScreen.set(mesh.position.x, mesh.position.y, mesh.position.z);
          tempSphereScreen.project(camera);

          const dx = tempSphereScreen.x - mouseScreenRef.current.x;
          const dy = tempSphereScreen.y - mouseScreenRef.current.y;
          const distToCursor = Math.hypot(dx, dy);

          const influenceRadius = 0.95;
          if (distToCursor < influenceRadius && cursorSpeed > 0.0008) {
            const proximityFactor = Math.pow(1 - distToCursor / influenceRadius, 1.5);
            
            const pushDirX = dx / (distToCursor + 0.08);
            const pushDirY = dy / (distToCursor + 0.08);
            
            const impulseMagnitude = cursorSpeed * 14.0 * proximityFactor;
            item.momentumVelocity.x += (mouseVelocity.x * 18.0 + pushDirX * impulseMagnitude * 0.5) * delta * 60;
            item.momentumVelocity.y += (mouseVelocity.y * 18.0 + pushDirY * impulseMagnitude * 0.5) * delta * 60;
            item.momentumVelocity.z += (pushDirX * mouseVelocity.x + pushDirY * mouseVelocity.y) * 8.0 * delta * 60;

            item.angularMomentum.y += (mouseVelocity.x * 24.0 + pushDirX * 3.0) * proximityFactor * delta * 60;
            item.angularMomentum.x -= (mouseVelocity.y * 24.0 + pushDirY * 3.0) * proximityFactor * delta * 60;
          }

          const springConstant = 12.0;
          const dampingFactor = 0.91;

          const accelX = -springConstant * item.momentumOffset.x;
          const accelY = -springConstant * item.momentumOffset.y;
          const accelZ = -springConstant * item.momentumOffset.z;

          item.momentumVelocity.x += accelX * delta;
          item.momentumVelocity.y += accelY * delta;
          item.momentumVelocity.z += accelZ * delta;

          const friction = Math.pow(dampingFactor, delta * 60);
          item.momentumVelocity.multiplyScalar(friction);

          item.momentumOffset.x += item.momentumVelocity.x * delta;
          item.momentumOffset.y += item.momentumVelocity.y * delta;
          item.momentumOffset.z += item.momentumVelocity.z * delta;

          const rollFactor = 1.4 / Math.max(config.radius, 0.2);
          mesh.rotation.y += (item.momentumVelocity.x * rollFactor + item.angularMomentum.y) * delta;
          mesh.rotation.x += (-item.momentumVelocity.y * rollFactor + item.angularMomentum.x) * delta;

          item.angularMomentum.multiplyScalar(Math.pow(0.92, delta * 60));
        }

        const floatY = Math.sin(sceneTime * config.floatSpeed + idx * 0.8) * config.floatAmp;
        const floatX = Math.cos(sceneTime * (config.floatSpeed * 0.7) + idx * 0.5) * (config.floatAmp * 0.5);

        const targetBaseX = THREE.MathUtils.lerp(
          config.basePos[0] + config.scatterOffset[0],
          config.basePos[0],
          easeEntrance
        );
        const targetBaseY = THREE.MathUtils.lerp(
          config.basePos[1] + config.scatterOffset[1],
          config.basePos[1],
          easeEntrance
        );
        const targetBaseZ = THREE.MathUtils.lerp(
          config.basePos[2] + config.scatterOffset[2],
          config.basePos[2],
          easeEntrance
        );

        let targetX = targetBaseX + floatX + parallaxX + item.momentumOffset.x;
        let targetY = targetBaseY + floatY + parallaxY + item.momentumOffset.y;
        let targetZ = targetBaseZ + item.momentumOffset.z;
        let targetScale = config.radius * easeEntrance;

        if (isTransitioning) {
          targetX += config.scatterOffset[0] * 1.5;
          targetY += config.scatterOffset[1] * 1.5;
          targetZ += config.scatterOffset[2] * 2.0;
          targetScale = config.radius * 0.1;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, delta * 5);
          mat.transparent = true;
        } else if (isSelected) {
          targetZ += 0.85;
          targetScale = config.radius * 1.35;
          mat.emissive.setHex(0x14b8a6);
          mat.emissiveIntensity = 0.35;
        } else if (selected) {
          targetZ -= 0.6;
          targetScale = config.radius * 0.85;
          mat.emissive.setHex(0x111e28);
          mat.emissiveIntensity = 0.05;
        } else if (isHovered) {
          targetZ += 0.38;
          targetScale = config.radius * 1.22;
          mat.emissive.setHex(0x14b8a6);
          mat.emissiveIntensity = 0.28;
        } else {
          if (!matchesFilter) {
            targetScale = config.radius * 0.55 * easeEntrance;
            mat.opacity = 0.35;
            mat.transparent = true;
          } else {
            mat.opacity = 1.0;
            mat.transparent = false;
            mat.emissive.setHex(0x0f2926);
            mat.emissiveIntensity = 0.08;
          }
        }

        mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, delta * 4.2);
        mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, delta * 4.2);
        mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, delta * 4.2);

        item.currentScale = THREE.MathUtils.lerp(item.currentScale, targetScale, delta * 5.5);
        mesh.scale.set(item.currentScale, item.currentScale, item.currentScale);

        if (!prefersReducedMotion) {
          mesh.rotation.y += delta * config.rotSpeed * 0.65;
          mesh.rotation.x = Math.sin(sceneTime * 0.4 + idx) * 0.08;
        }
      });

      dustParticles.rotation.y = sceneTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      smoothSphereGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sphereMeshes.forEach((s) => {
        s.texture.dispose();
        s.mat.dispose();
      });
    };
  }, []);

  const handleNavigateToProjects = () => {
    setIsTransitioningOut(true);
    setTimeout(() => {
      if (onNavigateProjects) {
        onNavigateProjects();
      }
    }, 450);
  };

  const categories = ['all', 'Core Programming', 'Web Programming', 'Libraries & Frameworks'];

  return (
    <div
      id="skills_3d_universe_root"
      className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1. ENORMOUS BACKGROUND TYPOGRAPHY SITTING BEHIND THE 3D SPHERES */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h1
          id="skills_huge_background_typography"
          className="text-[20vw] sm:text-[24vw] font-black tracking-tighter uppercase font-display text-white/[0.038] leading-none select-none drop-shadow-[0_0_90px_rgba(20,184,166,0.08)]"
          style={{ letterSpacing: '-0.06em' }}
        >
          SKILLS
        </h1>
      </div>

      {/* 2. Top Bar with Return Action and Category Filter Pill System */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="skills_orbit_back_btn"
            onClick={onBackToOrbit}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121020]/90 hover:bg-[#1f1b36] border border-teal-500/30 text-xs font-mono text-teal-200 hover:text-white transition-all cursor-pointer shadow-md group"
          >
            <span className="text-teal-400 group-hover:-translate-x-1 transition-transform">←</span>
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/40 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span className="uppercase tracking-widest text-[10px] font-semibold">
              3D Skills Universe
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#110e1e]/85 border border-teal-500/25 backdrop-blur-md shadow-lg overflow-x-auto max-w-full">
          {categories.map((cat) => {
            const isActive = activeCategoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                id={`filter_btn_${cat.replace(/\s+/g, '_')}`}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/35 border border-teal-400/50 text-white font-bold shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat === 'all' ? 'ALL STACK' : cat.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Primary WebGL 3D Canvas Mount */}
      <div
        ref={mountRef}
        id="skills_threejs_canvas_mount"
        className="relative z-10 w-full flex-1 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* 4. Minimal Hover Tooltip HUD */}
      <AnimatePresence>
        {hoveredSkill && !selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className="fixed z-30 pointer-events-none -translate-x-1/2 -translate-y-16 px-3.5 py-2 rounded-xl bg-[#0e0c1a]/90 border border-teal-400/50 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.8)] text-center space-y-0.5"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`
            }}
          >
            <p className="text-xs font-bold text-white font-display flex items-center justify-center gap-1.5">
              <span>{hoveredSkill.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#14b8a6]" />
            </p>
            <p className="text-[10px] font-mono text-teal-300">
              {hoveredSkill.strength} • {hoveredSkill.techCategory}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Sleek Detail Panel on Sphere Click */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            id="skill_active_detail_panel"
            className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-lg p-5 sm:p-6 rounded-3xl bg-[#110e1e]/95 border border-teal-500/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white font-display">
                    {selectedSkill.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-teal-200 text-[10px] font-mono uppercase tracking-wider">
                    {selectedSkill.category}
                  </span>
                </div>
                <p className="text-xs font-mono text-teal-300 mt-0.5">
                  {selectedSkill.strength} • {selectedSkill.techCategory}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close skill detail"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mt-3.5">
              {selectedSkill.desc}
            </p>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Competency
              </span>
              <span className="text-zinc-500">Click any sphere to inspect</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Bottom Navigation Controls & Interaction Hints */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            13 3D Physical Spheres
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline text-zinc-400">
            Hover to inspect • Click to focus
          </span>
        </div>

        {/* CTA to Next Universe Section with Animated Particle Transition */}
        {onNavigateProjects && (
          <MagneticButton
            id="skills_next_projects_btn"
            onClick={handleNavigateToProjects}
            variant="secondary"
          >
            <span>Proceed to Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-teal-400" />
          </MagneticButton>
        )}
      </div>
    </div>
  );
};
