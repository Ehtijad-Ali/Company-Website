import { useState, useEffect, useRef } from "react";

const technologies = [
  { name: "HTML",       color: "#E34F26", bg: "#1a0800", icon: "HTML5_Logo"  },
  { name: "Node.js",    color: "#339933", bg: "#001a00", icon: "Nodejs_Logo" },
  { name: "CSS",        color: "#1572B6", bg: "#00081a", icon: "CSS3_Logo"   },
  { name: "React",      color: "#61DAFB", bg: "#001a1f", icon: "React_Logo"  },
  { name: "JavaScript", color: "#F7DF1E", bg: "#1a1800", icon: "JS_Logo"     },
  { name: "PHP",        color: "#777BB4", bg: "#0d0d1a", icon: "PHP_Logo"    },
];

const TechIcon = ({ tech, size = 64 }) => {
  const s = size;
  switch (tech.icon) {
    case "HTML5_Logo":
      return (
        <svg width={s} height={s} viewBox="0 0 512 512">
          <path fill="#E34F26" d="M108 0l36 404 112 32 112-32 36-404z"/>
          <path fill="#EF652A" d="M256 32v448l92-26 30-338z"/>
          <path fill="#fff" d="M256 208h-70l-5-58h75v-56H125l14 162h117zm0 141-60-17-4-45h-56l8 88 112 31z"/>
          <path fill="#ebebeb" d="M256 208v56h65l-6 73-59 17v58l112-31 8-88 8-85zm0-114v56h129l-5-56z"/>
        </svg>
      );
    case "Nodejs_Logo":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="#339933" opacity="0.9"/>
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#1a5c1a" strokeWidth="2"/>
          <text x="50" y="58" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="bold" fontFamily="monospace">JS</text>
        </svg>
      );
    case "CSS3_Logo":
      return (
        <svg width={s} height={s} viewBox="0 0 512 512">
          <path fill="#1572B6" d="M108 0l36 404 112 32 112-32 36-404z"/>
          <path fill="#33A9DC" d="M256 32v448l92-26 30-338z"/>
          <path fill="#fff" d="M256 264h-74l-5-55h79v-55H172l-5-54h89v-56H119l14 274 123 34zm0 91-61-17-4-46h-56l8 91 113 32z"/>
          <path fill="#ebebeb" d="M256 264v55l59-17 7-72h-66zm0-165v55h119l-5-55z"/>
        </svg>
      );
    case "React_Logo":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="9" fill="#61DAFB"/>
          <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="#61DAFB" strokeWidth="4"/>
          <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(120 50 50)"/>
        </svg>
      );
    case "JS_Logo":
      return (
        <svg width={s} height={s} viewBox="0 0 256 256">
          <rect width="256" height="256" fill="#F7DF1E"/>
          <path fill="#000" d="M67 212l19-12c4 7 7 12 14 12s12-3 12-15v-80h24v81c0 25-14 36-36 36-19 0-30-10-36-22zm85-3l19-12c5 9 12 15 24 15s19-6 19-14c0-10-7-13-20-19l-7-3c-20-8-33-19-33-41 0-20 15-36 40-36 17 0 30 6 38 22l-19 12c-4-8-9-11-19-11s-16 6-16 13c0 9 6 13 19 19l7 3c23 10 37 20 37 44 0 25-19 39-46 39-26 0-42-13-50-31z"/>
        </svg>
      );
    case "PHP_Logo":
      return (
        <svg width={s} height={s} viewBox="0 0 256 135">
          <ellipse cx="128" cy="67" rx="128" ry="67" fill="#777BB4"/>
          <path fill="#fff" d="M58 101l12-61h30c13 0 22 7 19 22-3 16-15 22-28 22H76l-4 17zm16-28h12c6 0 11-3 12-10 1-6-2-9-8-9H78zm38 28l12-61h30c13 0 22 7 19 22-3 16-15 22-28 22h-15l-4 17zm16-28h12c6 0 11-3 12-10 1-6-2-9-8-9h-12zm27 28l7-34h-9l3-13h9l4-14h18l-4 14h13l-3 13h-13l-6 29c-1 4 0 5 4 5h8l-3 14h-14c-12 0-16-5-14-14z"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function TechCube() {
  const [rotX, setRotX]         = useState(-20);
  const [rotY, setRotY]         = useState(30);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale]       = useState(0.75);
  const animRef    = useRef(null);
  const isDragging = useRef(false);
  const lastPos    = useRef({ x: 0, y: 0 });
  const velocity   = useRef({ x: 0.4, y: 0 });

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        if (!isHovered) {
          velocity.current.x = 0.4;
          velocity.current.y = 0;
          setRotY(prev => prev + 0.4);
          setRotX(prev => prev + (-20 - prev) * 0.03);
        } else {
          velocity.current.x *= 0.94;
          velocity.current.y *= 0.94;
          setRotY(prev => prev + velocity.current.x);
          setRotX(prev => prev - velocity.current.y);
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered]);

  const handleMouseEnter = () => { setIsHovered(true);  setScale(1); };
  const handleMouseLeave = () => { setIsHovered(false); setScale(0.75); isDragging.current = false; };
  const handleMouseDown  = (e) => { isDragging.current = true; lastPos.current = { x: e.clientX, y: e.clientY }; velocity.current = { x:0, y:0 }; };
  const handleMouseMove  = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    velocity.current = { x: dx*0.6, y: dy*0.6 };
    setRotY(prev => prev + dx*0.6);
    setRotX(prev => prev - dy*0.6);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => { isDragging.current = false; };

  const cubeSize = 200;
  const half     = cubeSize / 2;

  const faces = [
    { transform: `translateZ(${half}px)`,                  tech: technologies[0] },
    { transform: `translateZ(-${half}px) rotateY(180deg)`, tech: technologies[1] },
    { transform: `translateX(-${half}px) rotateY(-90deg)`, tech: technologies[2] },
    { transform: `translateX(${half}px) rotateY(90deg)`,   tech: technologies[3] },
    { transform: `translateY(-${half}px) rotateX(90deg)`,  tech: technologies[4] },
    { transform: `translateY(${half}px) rotateX(-90deg)`,  tech: technologies[5] },
  ];

  return (
    <div style={{
      background: "var(--bg-card)",
      backgroundImage: "var(--cube-bg)",
      backgroundBlendMode: "overlay",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: 380, userSelect: "none",
      fontFamily: "'Courier New', monospace",
      border: "1px solid var(--border)",
      boxShadow: "0 0 60px var(--glow)",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: "400px", height: "400px",
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(97,218,251,0.06) 0%, transparent 70%)",
      }}/>

      <div style={{
        position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 3,
        textTransform: "uppercase", whiteSpace: "nowrap",
      }}>
        Hover · Expand · Drag to Rotate
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ perspective: "900px" }}
      >
        <div style={{
          width: `${cubeSize}px`, height: `${cubeSize}px`,
          position: "relative", transformStyle: "preserve-3d",
          transform: `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "scale 0.7s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {faces.map((face, i) => (
            <div key={i} style={{
              position: "absolute",
              width: `${cubeSize}px`, height: `${cubeSize}px`,
              transform: face.transform,
              background: `linear-gradient(145deg, ${face.tech.bg} 0%, #060606 100%)`,
              border: `1.5px solid ${face.tech.color}55`,
              boxSizing: "border-box",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "12px",
              boxShadow: `inset 0 0 50px ${face.tech.color}18, 0 0 30px ${face.tech.color}08`,
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${i < 2 ? "#ff3333" : "#3366ff"}, transparent)`,
              }}/>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${i < 2 ? "#3366ff" : "#ff3333"}, transparent)`,
              }}/>
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: "2px",
                background: `linear-gradient(180deg, transparent, ${face.tech.color}44, transparent)`,
              }}/>
              <div style={{
                position: "absolute", top: 0, right: 0, bottom: 0, width: "2px",
                background: `linear-gradient(180deg, transparent, ${face.tech.color}44, transparent)`,
              }}/>
              <TechIcon tech={face.tech} size={76} />
              <span style={{
                color: face.tech.color, fontSize: "14px", fontWeight: "700",
                letterSpacing: "3px", textTransform: "uppercase",
                textShadow: `0 0 16px ${face.tech.color}cc`,
              }}>
                {face.tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: 3,
        animation: "cubeBlink 2.5s ease-in-out infinite",
        whiteSpace: "nowrap",
      }}>
        ⟳ 360° INTERACTIVE
      </div>

      <style>{`
        @keyframes cubeBlink {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
