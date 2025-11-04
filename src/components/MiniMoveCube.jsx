import { useEffect, useMemo, useRef, useState } from 'react';

// A tiny CSS-3D cube that animates the face corresponding to the current move.
// Not a full simulator; it visually hints which face turns and in what direction.
export default function MiniMoveCube({ move, size = 140 }) {
  const [tick, setTick] = useState(0);

  // Parse move token into face + amount + direction
  const parsed = useMemo(() => parseMove(move), [move]);

  useEffect(() => {
    if (!move) return;
    // Bump a tick to retrigger CSS animations that depend on keys
    setTick((t) => t + 1);
  }, [move]);

  // Whole-cube subtle rotation for cube rotations (x, y, z)
  const wholeRot = useMemo(() => {
    if (!parsed) return 'rotateX(-15deg) rotateY(-20deg) rotateZ(0deg)';
    const { type, face, dir, amount } = parsed;
    if (type !== 'cube') return 'rotateX(-15deg) rotateY(-20deg) rotateZ(0deg)';
    const deg = 15 * dir * (amount === 2 ? 2 : 1);
    if (face === 'x') return `rotateX(${deg}deg) rotateY(-10deg)`;
    if (face === 'y') return `rotateY(${deg}deg) rotateX(-10deg)`;
    if (face === 'z') return `rotateZ(${deg}deg) rotateX(-10deg)`;
    return 'rotateX(-15deg) rotateY(-20deg) rotateZ(0deg)';
  }, [parsed]);

  const faceSize = Math.min(200, Math.max(110, size));
  const depth = faceSize / 2;

  // Determine which face should spin
  const spin = useMemo(() => {
    if (!parsed || parsed.type !== 'face') return null;
    const { face, dir, amount } = parsed;
    return { face, dir, amount };
  }, [parsed]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative" style={{ width: faceSize, height: faceSize, perspective: 800 }}>
        <div className="relative h-full w-full transition-transform duration-300" style={{ transformStyle: 'preserve-3d', transform: wholeRot }}>
          <Face id="F" depth={depth} color="#22c55e" spin={spin} tick={tick} />
          <Face id="B" depth={depth} color="#3b82f6" spin={spin} tick={tick} />
          <Face id="R" depth={depth} color="#ef4444" spin={spin} tick={tick} />
          <Face id="L" depth={depth} color="#f97316" spin={spin} tick={tick} />
          <Face id="U" depth={depth} color="#f8fafc" spin={spin} tick={tick} />
          <Face id="D" depth={depth} color="#facc15" spin={spin} tick={tick} />
        </div>
      </div>
    </div>
  );
}

function Face({ id, depth, color, spin, tick }) {
  const base = faceTransform(id, depth);
  const isSpinning = spin && spin.face === id;
  const dir = isSpinning ? spin.dir : 1;
  const amount = isSpinning ? spin.amount : 1;
  const duration = amount === 2 ? 600 : 300;

  return (
    <div
      className="absolute"
      style={{
        width: depth * 2,
        height: depth * 2,
        transformStyle: 'preserve-3d',
        transform: base,
      }}
    >
      <div
        key={`${id}-${tick}`}
        className="grid grid-cols-3 grid-rows-3 gap-0.5 origin-center"
        style={{
          width: '100%',
          height: '100%',
          animationName: isSpinning ? 'faceSpin' : 'none',
          animationDuration: `${duration}ms`,
          animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          animationIterationCount: 1,
          animationDirection: dir === 1 ? 'normal' : 'reverse',
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={`${id}-${i}-${tick}`}
            className="rounded-sm"
            style={{
              background: color,
              width: '100%',
              height: '100%',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes faceSpin {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(90deg); }
        }
      `}</style>
    </div>
  );
}

function faceTransform(id, depth) {
  switch (id) {
    case 'F':
      return `translateZ(${depth}px)`;
    case 'B':
      return `rotateY(180deg) translateZ(${depth}px)`;
    case 'R':
      return `rotateY(90deg) translateZ(${depth}px)`;
    case 'L':
      return `rotateY(-90deg) translateZ(${depth}px)`;
    case 'U':
      return `rotateX(90deg) translateZ(${depth}px)`;
    case 'D':
      return `rotateX(-90deg) translateZ(${depth}px)`;
    default:
      return '';
  }
}

function parseMove(token) {
  if (!token) return null;
  const t = token.trim();
  // Whole cube rotations
  if (t[0] === 'x' || t[0] === 'y' || t[0] === 'z') {
    const face = t[0];
    const amount = t.includes('2') ? 2 : 1;
    const dir = t.includes("'") ? -1 : 1;
    return { type: 'cube', face, dir, amount };
  }
  // Middle slice M: treat as hint, no specific face spin
  if (t[0] === 'M') {
    const amount = t.includes('2') ? 2 : 1;
    const dir = t.includes("'") ? -1 : 1;
    return { type: 'slice', face: 'M', dir, amount };
  }
  // Standard faces
  const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
  const face = faces.find((f) => t.startsWith(f));
  if (!face) return null;
  const amount = t.includes('2') ? 2 : 1;
  const dir = t.includes("'") ? -1 : 1;
  return { type: 'face', face, dir, amount };
}
