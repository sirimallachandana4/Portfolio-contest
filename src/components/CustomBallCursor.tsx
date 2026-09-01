import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CustomBallCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'active' | 'view'>('default');
  const [isClicked, setIsClicked] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailIdCounter = useRef(0);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Determine hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('button, a, input, textarea, [role="button"], .cursor-pointer, #skills_threejs_canvas_mount');
      const isProjectCard = target.closest('[data-project-card="true"]');

      if (isProjectCard) {
        setCursorState('view');
      } else if (isInteractive) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setCursorState('active');
    };

    const handleMouseUp = () => {
      setIsClicked(false);
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth inertia animation loop with requestAnimationFrame
    let animationFrameId: number;
    let lastTrailTime = 0;

    const renderLoop = (time: number) => {
      // Lerp current position toward target position
      const ease = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Add trail point every 45ms
      if (time - lastTrailTime > 45 && targetPos.current.x > 0) {
        lastTrailTime = time;
        const newPoint: TrailPoint = {
          x: currentPos.current.x,
          y: currentPos.current.y,
          id: trailIdCounter.current++
        };
        setTrail((prev) => [...prev.slice(-3), newPoint]);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  const getScale = () => {
    if (cursorState === 'active') return 'scale(0.85)';
    if (cursorState === 'hover') return 'scale(1.45)';
    if (cursorState === 'view') return 'scale(2.0)';
    return 'scale(1)';
  };

  return (
    <>
      {/* Subtle Motion Trail (3-4 small fading particles) */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / (trail.length + 1) * 0.35;
        const size = 6 - (trail.length - index);
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-50 rounded-full bg-purple-400 blur-[0.5px] transition-opacity duration-300"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${Math.max(size, 2)}px`,
              height: `${Math.max(size, 2)}px`,
              transform: 'translate(-50%, -50%)',
              opacity
            }}
          />
        );
      })}

      {/* Main 3D-style Ball Cursor */}
      <div
        ref={cursorRef}
        id="custom_3d_ball_cursor"
        className="fixed top-0 left-0 pointer-events-none z-50 transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          width: cursorState === 'view' ? '44px' : cursorState === 'hover' ? '22px' : '13px',
          height: cursorState === 'view' ? '44px' : cursorState === 'hover' ? '22px' : '13px'
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-transform duration-200 flex items-center justify-center ${
            cursorState === 'view'
              ? 'bg-purple-900/80 border border-purple-400 text-[9px] font-mono text-purple-200 font-bold uppercase backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.6)]'
              : cursorState === 'hover'
              ? 'bg-gradient-to-tr from-purple-200 via-white to-purple-100 border border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.7)]'
              : 'bg-gradient-to-tr from-purple-100 via-white to-indigo-100 shadow-[0_0_10px_rgba(168,85,247,0.5),0_2px_4px_rgba(0,0,0,0.4)]'
          }`}
          style={{ transform: getScale() }}
        >
          {cursorState === 'view' && <span>VIEW</span>}
          {cursorState !== 'view' && (
            <div className="w-[30%] h-[30%] rounded-full bg-white opacity-80 -translate-x-0.5 -translate-y-0.5" />
          )}
        </div>

        {/* Click ripple animation */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border border-purple-400/80 animate-ping pointer-events-none" />
        )}
      </div>
    </>
  );
};
