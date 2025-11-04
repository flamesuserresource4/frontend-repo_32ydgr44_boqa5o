import { useEffect, useRef, useState } from 'react';

// A lightweight 3D cube built with CSS transforms.
// Not a full simulator — just a visual aid for engagement.
export default function CubeShowcase() {
  const [rot, setRot] = useState({ x: -22, y: -32 });
  const rafRef = useRef(0);
  const runningRef = useRef(true);

  useEffect(() => {
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(32, now - last);
      last = now;
      if (runningRef.current) {
        setRot((r) => ({ x: r.x, y: r.y + (dt * 0.02) }));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="relative"
        onMouseEnter={() => (runningRef.current = false)}
        onMouseLeave={() => (runningRef.current = true)}
        style={{ width: 320, height: 320 }}
      >
        <div
          className="absolute inset-0"
          style={{
            perspective: 900,
          }}
        >
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
              transition: 'transform 120ms linear',
            }}
          >
            {faces.map((f, i) => (
              <Face key={i} {...f} />
            ))}
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-gray-500">
          Arahkan kursor untuk menghentikan rotasi
        </div>
      </div>
    </div>
  );
}

function Face({ transform, color }) {
  const tiles = Array.from({ length: 9 });
  return (
    <div
      className="absolute grid grid-cols-3 grid-rows-3 gap-1"
      style={{
        width: 200,
        height: 200,
        transformStyle: 'preserve-3d',
        transform,
      }}
    >
      {tiles.map((_, idx) => (
        <div
          key={idx}
          className="rounded-sm shadow-sm"
          style={{
            background: color,
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.15)',
          }}
        />
      ))}
    </div>
  );
}

const faces = [
  // Front (green)
  { transform: 'translateZ(100px)', color: '#22c55e' },
  // Back (blue)
  { transform: 'rotateY(180deg) translateZ(100px)', color: '#3b82f6' },
  // Right (red)
  { transform: 'rotateY(90deg) translateZ(100px)', color: '#ef4444' },
  // Left (orange)
  { transform: 'rotateY(-90deg) translateZ(100px)', color: '#f97316' },
  // Top (white)
  { transform: 'rotateX(90deg) translateZ(100px)', color: '#f8fafc' },
  // Bottom (yellow)
  { transform: 'rotateX(-90deg) translateZ(100px)', color: '#facc15' },
];
