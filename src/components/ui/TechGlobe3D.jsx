import { useEffect, useRef, useState, useCallback } from "react";

const TECHS = [
  { id: "react",      label: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",           color: "#61DAFB" },
  { id: "nodejs",     label: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",          color: "#539E43" },
  { id: "nextjs",     label: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",          color: "#ffffff" },
  { id: "postgresql", label: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",  color: "#336791" },
  { id: "aws",        label: "AWS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" },
  { id: "webpack",    label: "Webpack",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",        color: "#8DD6F9" },
  { id: "vite",       label: "Vite",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",          color: "#646CFF" },
  { id: "redux",      label: "Redux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",            color: "#764ABC" },
  { id: "jest",       label: "Jest",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",                 color: "#C21325" },
  { id: "graphql",    label: "GraphQL",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",           color: "#E10098" },
  { id: "nginx",      label: "Nginx",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",            color: "#009639" },
  { id: "figma",      label: "Figma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",            color: "#F24E1E" },
  { id: "prisma",     label: "Prisma",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",          color: "#ffffff" },
  { id: "azure",      label: "Azure",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",            color: "#0089D6" },
  { id: "dart",       label: "Dart",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",              color: "#00B4AB" },
  { id: "linux",      label: "Linux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",            color: "#FCC624" },
  { id: "typescript", label: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { id: "docker",     label: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",          color: "#2496ED" },
];

function fibonacciSphere(n, R = 260) {
  return Array.from({ length: n }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      bx: R * Math.sin(phi) * Math.cos(theta),
      by: R * Math.sin(phi) * Math.sin(theta),
      bz: R * Math.cos(phi),
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function geodesicSphere(R = 260, detail = 2) {
  const t = (1 + Math.sqrt(5)) / 2;
  const verts = [
    [-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],
    [0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],
    [t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1],
  ].map(([x,y,z]) => { const l = Math.sqrt(x*x+y*y+z*z); return [x/l*R,y/l*R,z/l*R]; });

  const faces = [
    [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
    [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
    [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
    [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
  ];

  function midpoint(a, b) {
    const m = [(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2];
    const l = Math.sqrt(m[0]**2+m[1]**2+m[2]**2);
    return [m[0]/l*R,m[1]/l*R,m[2]/l*R];
  }

  let v = [...verts], f = [...faces];
  for (let d = 0; d < detail; d++) {
    const next = [], cache = {};
    const mid = (i, j) => {
      const key = `${Math.min(i,j)},${Math.max(i,j)}`;
      if (!cache[key]) { v.push(midpoint(v[i],v[j])); cache[key] = v.length-1; }
      return cache[key];
    };
    f.forEach(([a,b,c]) => {
      const ab=mid(a,b), bc=mid(b,c), ca=mid(c,a);
      next.push([a,ab,ca],[b,bc,ab],[c,ca,bc],[ab,bc,ca]);
    });
    f = next;
  }
  return { verts: v, faces: f };
}

function rotXY(x,y,z,ax,ay) {
  const x1 = x*Math.cos(ay) + z*Math.sin(ay);
  const z1 = -x*Math.sin(ay) + z*Math.cos(ay);
  const y2 = y*Math.cos(ax) - z1*Math.sin(ax);
  const z2 = y*Math.sin(ax) + z1*Math.cos(ax);
  return [x1,y2,z2];
}

function proj(x,y,z,W,H,fov=700) {
  const s = fov/(fov+z+350);
  return { sx: x*s+W/2, sy: y*s+H/2, scale: s, z };
}

function getThemeColors() {
  const dark = document.documentElement.classList.contains('dark');
  return {
    bg:       dark ? '#0a0a0a'              : '#f5e8d0',
    wire:     dark ? 'rgba(210,225,255,'   : 'rgba(80,55,20,',
    sph:      dark ? 'rgba(255,255,255,0.025)' : 'rgba(80,55,20,0.07)',
    iconBg:   dark ? 'rgba(8,8,8,0.9)'    : 'rgba(253,248,239,0.95)',
    iconBgHv: dark ? 'rgba(22,22,22,0.97)': 'rgba(234,220,196,0.97)',
    labelBg:  dark ? 'rgba(0,0,0,0.82)'   : 'rgba(253,248,239,0.92)',
    labelTx:  dark ? '#ffffff'             : '#1a1008',
  };
}

export default function TechGlobe3D() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const timeRef   = useRef(0);
  const rotRef    = useRef({ ax: 0.15, ay: 0 });
  const dragRef   = useRef({ dragging:false, lx:0, ly:0, vx:0, vy:0 });
  const hovRef    = useRef(null);
  const themeRef  = useRef(getThemeColors());
  const [hovered, setHovered] = useState(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      themeRef.current = getThemeColors();
      forceUpdate(n => n + 1);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const iconsRef = useRef({});
  useEffect(() => {
    TECHS.forEach(tech => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = tech.icon;
      img.onload = () => { iconsRef.current[tech.id] = img; };
    });
  }, []);

  const geoRef = useRef(geodesicSphere(260, 2));
  const posRef = useRef(
    fibonacciSphere(TECHS.length, 260).map((p, i) => ({ ...p, ...TECHS[i] }))
  );

  useEffect(() => { hovRef.current = hovered; }, [hovered]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    timeRef.current += 0.008;
    const t = timeRef.current;

    const drag = dragRef.current;
    if (!drag.dragging) {
      rotRef.current.ay += drag.vx;
      rotRef.current.ax += drag.vy;
      drag.vx *= 0.92;
      drag.vy *= 0.92;
      rotRef.current.ay += 0.003;
    }
    const { ax, ay } = rotRef.current;

    const C = themeRef.current;
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    const { verts, faces } = geoRef.current;
    const projVerts = verts.map(([x,y,z]) => {
      const [rx,ry,rz] = rotXY(x,y,z,ax,ay);
      return proj(rx,ry,rz,W,H);
    });

    ctx.save();
    const sphGrad = ctx.createRadialGradient(W/2,H/2,75,W/2,H/2,290);
    sphGrad.addColorStop(0, C.sph);
    sphGrad.addColorStop(1,"transparent");
    ctx.fillStyle = sphGrad;
    ctx.beginPath();
    ctx.arc(W/2,H/2,290,0,Math.PI*2);
    ctx.fill();
    ctx.restore();

    const edgeSet = new Set();
    faces.forEach(([a,b,c]) => {
      [[a,b],[b,c],[c,a]].forEach(([i,j]) => {
        const key = `${Math.min(i,j)}-${Math.max(i,j)}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          const pA = projVerts[i], pB = projVerts[j];
          const avgZ = (pA.z + pB.z) / 2;
          const depth = Math.max(0, Math.min(1, (avgZ + 270) / 540));
          const alpha = 0.04 + depth * 0.22;
          ctx.save();
          ctx.strokeStyle = `${C.wire}${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pA.sx, pA.sy);
          ctx.lineTo(pB.sx, pB.sy);
          ctx.stroke();
          ctx.restore();
        }
      });
    });

    const nodes = posRef.current;
    const projected = nodes.map((n) => {
      const float = {
        x: Math.sin(t*0.35+n.phase)*5,
        y: Math.cos(t*0.28+n.phase)*4,
        z: Math.sin(t*0.22+n.phase*1.4)*3,
      };
      const [rx,ry,rz] = rotXY(n.bx+float.x, n.by+float.y, n.bz+float.z, ax, ay);
      return { ...proj(rx,ry,rz,W,H), node:n };
    }).sort((a,b) => a.z - b.z);

    projected.forEach(({ sx, sy, scale, z, node }) => {
      const isHov = hovRef.current === node.id;
      const depth = Math.max(0, Math.min(1, (z+280)/560));
      const iconSize = Math.max(22, 44*scale*(0.55+depth*0.65)) * (isHov ? 1.28 : 1);
      const alpha = 0.28 + depth*0.72;
      const glowR = iconSize * 0.9;

      ctx.save();
      ctx.globalAlpha = alpha;

      const glowGrad = ctx.createRadialGradient(sx,sy,0,sx,sy,glowR*1.8);
      glowGrad.addColorStop(0, node.color+"38");
      glowGrad.addColorStop(0.45, node.color+"12");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(sx, sy, glowR*1.8, 0, Math.PI*2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sx, sy, glowR*0.72, 0, Math.PI*2);
      ctx.fillStyle = isHov ? C.iconBgHv : C.iconBg;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isHov ? 24 : 10;
      ctx.fill();
      ctx.strokeStyle = node.color + (isHov ? "cc" : "40");
      ctx.lineWidth = isHov ? 2 : 1;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const img = iconsRef.current[node.id];
      if (img) {
        ctx.globalAlpha = alpha;
        const s = iconSize * 0.7;
        ctx.drawImage(img, sx-s/2, sy-s/2, s, s);
      } else {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = node.color;
        ctx.font = `bold ${Math.max(10, iconSize*0.38)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label[0], sx, sy);
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      if (z > -50) {
        const labelAlpha = Math.min(1, (z+50)/100) * alpha;
        const fs = Math.max(9, Math.round(11*scale*(0.65+depth*0.55)));
        ctx.save();
        ctx.font = `${fs}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const ly = sy + glowR * 0.84;
        const tw = ctx.measureText(node.label).width;
        ctx.globalAlpha = labelAlpha * (isHov ? 1 : 0.75);
        ctx.fillStyle = C.labelBg;
        ctx.fillRect(sx-tw/2-4, ly-1, tw+8, fs+5);
        ctx.fillStyle = isHov ? C.labelTx : node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHov ? 8 : 2;
        ctx.fillText(node.label, sx, ly);
        ctx.restore();
      }
    });

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const getHovered = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = (clientX - rect.left) * (canvas.width / rect.width);
    const my = (clientY - rect.top)  * (canvas.height / rect.height);
    const { ax, ay } = rotRef.current;
    const W = canvas.width, H = canvas.height;
    for (const n of posRef.current) {
      const [rx,ry,rz] = rotXY(n.bx,n.by,n.bz,ax,ay);
      const { sx, sy, scale } = proj(rx,ry,rz,W,H);
      const r = Math.max(22, 44*scale*0.9) + 10;
      if (Math.hypot(mx-sx,my-sy) < r) return n.id;
    }
    return null;
  }, []);

  const onMouseDown = (e) => {
    dragRef.current = { dragging:true, lx:e.clientX, ly:e.clientY, vx:0, vy:0 };
  };
  const onMouseMove = (e) => {
    const d = dragRef.current;
    if (d.dragging) {
      const dx = e.clientX-d.lx, dy = e.clientY-d.ly;
      d.vx = dx*0.004; d.vy = dy*0.004;
      rotRef.current.ay += dx*0.004;
      rotRef.current.ax += dy*0.004;
      d.lx = e.clientX; d.ly = e.clientY;
    }
    const h = getHovered(e.clientX, e.clientY);
    hovRef.current = h;
    setHovered(h);
  };
  const onMouseUp = () => { dragRef.current.dragging = false; };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    dragRef.current = { dragging:true, lx:touch.clientX, ly:touch.clientY, vx:0, vy:0 };
  };
  const onTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const d = dragRef.current;
    const dx = touch.clientX-d.lx, dy = touch.clientY-d.ly;
    d.vx = dx*0.004; d.vy = dy*0.004;
    rotRef.current.ay += dx*0.004;
    rotRef.current.ax += dy*0.004;
    d.lx = touch.clientX; d.ly = touch.clientY;
  };

  const hovTech = TECHS.find(t => t.id === hovered);

  return (
    <div style={{ position:'relative', width:'100%', lineHeight:0 }}>
      <canvas
        ref={canvasRef}
        width={620}
        height={580}
        style={{
          width: '100%',
          maxWidth: '100%',   // the 620px intrinsic width must never set a floor
          height: 'auto',
          display: 'block',
          borderRadius: 16,
          cursor: hovered ? 'pointer' : 'grab',
          touchAction: 'none',
          background: themeRef.current.bg,
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { onMouseUp(); hovRef.current=null; setHovered(null); }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { dragRef.current.dragging=false; }}
      />

      {/* Hover label */}
      {hovTech && (
        <div style={{
          position: 'absolute',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.95)',
          border: `1px solid ${hovTech.color}66`,
          color: hovTech.color,
          padding: '6px 20px',
          borderRadius: 8,
          fontSize: 11,
          letterSpacing: 3,
          boxShadow: `0 0 20px ${hovTech.color}33`,
          pointerEvents: 'none',
          textTransform: 'uppercase',
          fontFamily: "'Courier New', monospace",
          whiteSpace: 'nowrap',
        }}>
          {hovTech.label}
        </div>
      )}

      {/* Drag hint */}
      <div style={{
        position: 'absolute',
        bottom: 14,
        right: 16,
        color: 'rgba(255,255,255,0.2)',
        fontSize: 9,
        letterSpacing: 2,
        pointerEvents: 'none',
        fontFamily: "'Courier New', monospace",
        textTransform: 'uppercase',
      }}>
        Drag to rotate
      </div>
    </div>
  );
}
