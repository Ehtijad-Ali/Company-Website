import { useEffect, useRef, useState, useCallback } from "react";

const NODES = [
  {
    id: "n0", label: "Web Dev", delay: "0s",
    color: "#FF6B6B", glow: "rgba(255,107,107,0.6)", bg: "rgba(255,107,107,0.12)",
    border: "rgba(255,107,107,0.5)",
    icon: (c) => (
      <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
        <polyline points="8 10 2 17 8 24" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="26 10 32 17 26 24" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="19" y1="6" x2="15" y2="28" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "n1", label: "AI / ML", delay: "0.8s",
    color: "#FFD93D", glow: "rgba(255,217,61,0.6)", bg: "rgba(255,217,61,0.12)",
    border: "rgba(255,217,61,0.5)",
    icon: (c) => (
      <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
        <circle cx="17" cy="10" r="4" stroke={c} strokeWidth="1.6"/>
        <circle cx="8"  cy="25" r="3" stroke={c} strokeWidth="1.4"/>
        <circle cx="26" cy="25" r="3" stroke={c} strokeWidth="1.4"/>
        <path d="M17 14v4M13 22l-4 1M21 22l4 1" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "n2", label: "Mobile", delay: "1.4s",
    color: "#C77DFF", glow: "rgba(199,125,255,0.6)", bg: "rgba(199,125,255,0.12)",
    border: "rgba(199,125,255,0.5)",
    icon: (c) => (
      <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
        <rect x="11" y="5" width="12" height="24" rx="2" stroke={c} strokeWidth="1.6"/>
        <circle cx="17" cy="25" r="1.5" fill={c}/>
        <line x1="13" y1="9" x2="21" y2="9" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "n3", label: "Commerce", delay: "0.4s",
    color: "#06D6A0", glow: "rgba(6,214,160,0.6)", bg: "rgba(6,214,160,0.12)",
    border: "rgba(6,214,160,0.5)",
    icon: (c) => (
      <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
        <path d="M8 11h18l-2.5 13H10.5L8 11z" stroke={c} strokeWidth="1.6"/>
        <path d="M14 11V9a3 3 0 016 0v2" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "n4", label: "DevOps", delay: "2s",
    color: "#4CC9F0", glow: "rgba(76,201,240,0.6)", bg: "rgba(76,201,240,0.12)",
    border: "rgba(76,201,240,0.5)",
    icon: (c) => (
      <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
        <circle cx="17" cy="17" r="6" stroke={c} strokeWidth="1.6"/>
        <path d="M17 11V7M17 27v-4M11 17H7M27 17h-4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="2" fill={c}/>
      </svg>
    ),
  },
  {
    id: "n5", label: "Deploy", delay: "1s",
    color: "#FF9F1C", glow: "rgba(255,159,28,0.6)", bg: "rgba(255,159,28,0.12)",
    border: "rgba(255,159,28,0.5)",
    icon: (c) => (
      <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
        <path d="M17 7c0 0 8 4 8 14H9c0-10 8-14 8-14z" stroke={c} strokeWidth="1.6"/>
        <path d="M11 21l-3 5M23 21l3 5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="15" r="3" stroke={c} strokeWidth="1.4"/>
      </svg>
    ),
  },
];

const NODE_POSITIONS = [
  { top: "9%",    left: "10%"  },
  { top: "9%",    right: "10%" },
  { top: "44%",   left: "2%"   },
  { top: "44%",   right: "2%"  },
  { bottom: "9%", left: "10%"  },
  { bottom: "9%", right: "10%" },
];

const HUB_COLORS = ["#FF6B6B","#FFD93D","#C77DFF","#06D6A0","#4CC9F0","#FF9F1C"];

function hexToRgbStr(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

function bez(x0,y0,cx1,cy1,cx2,cy2,x1,y1,t) {
  const m=1-t;
  return {
    x: m*m*m*x0+3*m*m*t*cx1+3*m*t*t*cx2+t*t*t*x1,
    y: m*m*m*y0+3*m*m*t*cy1+3*m*t*t*cy2+t*t*t*y1,
  };
}

function getCtrl(hc, nc) {
  const dx=nc.x-hc.x, dy=nc.y-hc.y;
  const curve=0.22;
  return {
    cx1: hc.x+dx*0.3+dy*curve,
    cy1: hc.y+dy*0.3-dx*curve,
    cx2: hc.x+dx*0.7-dy*curve,
    cy2: hc.y+dy*0.7+dx*curve,
  };
}

export default function HubSpoke() {
  const [hovered, setHovered] = useState(null);
  const [hubColorIdx, setHubColorIdx] = useState(0);
  const wrapRef      = useRef(null);
  const canvasRef    = useRef(null);
  const pktsRef      = useRef([]);
  const rafRef       = useRef(null);
  const lastSpawnRef = useRef(0);
  const nodeRefsRef  = useRef({});
  const hubRef       = useRef(null);
  const hoveredRef   = useRef(null);
  hoveredRef.current = hovered;

  useEffect(() => {
    const id = setInterval(() => setHubColorIdx(i => (i+1) % HUB_COLORS.length), 1800);
    return () => clearInterval(id);
  }, []);

  const getCenter = useCallback((el) => {
    if (!el || !wrapRef.current) return { x:0, y:0 };
    const wr = wrapRef.current.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return { x: er.left-wr.left+er.width/2, y: er.top-wr.top+er.height/2 };
  }, []);

  const spawn = useCallback((i) => {
    const hub  = hubRef.current;
    const node = nodeRefsRef.current[`n${i}`];
    if (!hub || !node) return;
    const hc = getCenter(hub);
    const nc = getCenter(node);
    const toNode = Math.random() > 0.5;
    const c = getCtrl(hc, nc);
    pktsRef.current.push({ i, t:0, speed:0.006+Math.random()*0.005, hc, nc, c, toNode });
  }, [getCenter]);

  useEffect(() => {
    const cv   = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const ctx = cv.getContext("2d");

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      cv.width = r.width; cv.height = r.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (ts) => {
      if (ts - lastSpawnRef.current > 380) {
        spawn(Math.floor(Math.random()*6));
        if (Math.random() > 0.5) spawn(Math.floor(Math.random()*6));
        lastSpawnRef.current = ts;
      }
      const hub = hubRef.current;
      if (!hub) { rafRef.current = requestAnimationFrame(frame); return; }
      const { width:W, height:H } = cv;
      ctx.clearRect(0, 0, W, H);
      const hc = getCenter(hub);

      NODES.forEach((n, i) => {
        const node = nodeRefsRef.current[n.id];
        if (!node) return;
        const nc  = getCenter(node);
        const c   = getCtrl(hc, nc);
        const isHov = hoveredRef.current === n.id;
        const rgb = hexToRgbStr(n.color);

        ctx.beginPath();
        ctx.moveTo(hc.x, hc.y);
        ctx.bezierCurveTo(c.cx1, c.cy1, c.cx2, c.cy2, nc.x, nc.y);
        ctx.strokeStyle = `rgba(${rgb},${isHov ? 0.25 : 0.08})`;
        ctx.lineWidth = isHov ? 10 : 6;
        ctx.stroke();

        const grad = ctx.createLinearGradient(hc.x, hc.y, nc.x, nc.y);
        grad.addColorStop(0,   `rgba(${rgb},${isHov ? 0.9 : 0.35})`);
        grad.addColorStop(0.5, `rgba(${rgb},${isHov ? 1   : 0.5 })`);
        grad.addColorStop(1,   `rgba(${rgb},${isHov ? 0.9 : 0.35})`);
        ctx.beginPath();
        ctx.moveTo(hc.x, hc.y);
        ctx.bezierCurveTo(c.cx1, c.cy1, c.cx2, c.cy2, nc.x, nc.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isHov ? 2 : 1;
        ctx.stroke();
      });

      pktsRef.current = pktsRef.current.filter((p) => {
        const node = nodeRefsRef.current[`n${p.i}`];
        if (!node) return false;
        const n   = NODES[p.i];
        const rgb = hexToRgbStr(n.color);
        const trail = 7;
        for (let j = trail; j >= 0; j--) {
          const tt = Math.max(0, p.t - j*0.014);
          const bp = p.toNode
            ? bez(p.hc.x,p.hc.y,p.c.cx1,p.c.cy1,p.c.cx2,p.c.cy2,p.nc.x,p.nc.y,tt)
            : bez(p.nc.x,p.nc.y,p.c.cx2,p.c.cy2,p.c.cx1,p.c.cy1,p.hc.x,p.hc.y,tt);
          const alpha  = j === 0 ? 1 : (1-j/trail)*0.4;
          const radius = j === 0 ? 4 : 2;
          if (j === 0) {
            ctx.beginPath();
            ctx.arc(bp.x, bp.y, 9, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${rgb},0.2)`;
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(bp.x, bp.y, radius, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${rgb},${alpha})`;
          ctx.fill();
        }
        p.t += p.speed;
        return p.t < 1;
      });

      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawn, getCenter]);

  const hubColor = HUB_COLORS[hubColorIdx];

  return (
    <div style={{
      background: "#090b10",
      fontFamily: "'Courier New', monospace",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(76,201,240,0.04) 0%, transparent 70%)",
      }}/>
      <div style={{
        position:"absolute", top:"-10%", right:"-5%", width:300, height:300,
        borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle, rgba(199,125,255,0.06) 0%, transparent 70%)",
      }}/>
      <div style={{
        position:"absolute", bottom:"-10%", left:"-5%", width:280, height:280,
        borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle, rgba(6,214,160,0.05) 0%, transparent 70%)",
      }}/>

      {[
        { pos:"topLeft",     color:"#FF6B6B" },
        { pos:"topRight",    color:"#FFD93D" },
        { pos:"bottomLeft",  color:"#4CC9F0" },
        { pos:"bottomRight", color:"#06D6A0" },
      ].map(({ pos, color }) => (
        <div key={pos} style={{
          position:"absolute", width:18, height:18, zIndex:30,
          borderTop:    pos.includes("top")    ? `2px solid ${color}` : "none",
          borderBottom: pos.includes("bottom") ? `2px solid ${color}` : "none",
          borderLeft:   pos.includes("Left")   ? `2px solid ${color}` : "none",
          borderRight:  pos.includes("Right")  ? `2px solid ${color}` : "none",
          top:    pos.includes("top")    ? 0 : "auto",
          bottom: pos.includes("bottom") ? 0 : "auto",
          left:   pos.includes("Left")   ? 0 : "auto",
          right:  pos.includes("Right")  ? 0 : "auto",
        }}/>
      ))}

      <div ref={wrapRef} style={{ position:"relative", minHeight:490, width:"100%" }}>
        <canvas ref={canvasRef} style={{
          position:"absolute", inset:0,
          width:"100%", height:"100%",
          pointerEvents:"none",
        }}/>

        {/* Hub */}
        <div ref={hubRef} style={{
          position:"absolute", left:"50%", top:"50%",
          transform:"translate(-50%,-50%)",
          width:130, height:130,
          display:"flex", alignItems:"center", justifyContent:"center",
          zIndex:20,
        }}>
          <div style={{
            position:"absolute", width:130, height:130, borderRadius:"50%",
            border:`1.5px dashed ${hubColor}55`,
            animation:"hubRingSpin 18s linear infinite",
            transition:"border-color 1.2s ease",
            boxShadow:`0 0 20px ${hubColor}22`,
          }}/>
          <div style={{
            position:"absolute", width:100, height:100, borderRadius:"50%",
            border:`1px solid ${hubColor}33`,
            animation:"hubRingSpin 10s linear infinite reverse",
            transition:"border-color 1.2s ease",
          }}/>
          <div style={{
            width:76, height:76, borderRadius:"50%",
            background:`radial-gradient(circle at 40% 40%, ${hubColor}33 0%, rgba(9,11,16,0.95) 70%)`,
            border:`2px solid ${hubColor}88`,
            display:"flex", alignItems:"center", justifyContent:"center",
            flexDirection:"column", gap:4,
            boxShadow:`0 0 30px ${hubColor}44, 0 0 60px ${hubColor}22, inset 0 0 20px ${hubColor}11`,
            transition:"all 1.2s ease",
          }}>
            <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
              <circle cx="11" cy="11" r="8" stroke={hubColor} strokeWidth="1.2" opacity="0.7"/>
              <path d="M11 3C8 6 8 16 11 19M11 3c3 3 3 13 0 16M3 11h16" stroke={hubColor} strokeWidth="0.8" opacity="0.5"/>
              <circle cx="11" cy="11" r="2.5" fill={hubColor} opacity="0.9"/>
            </svg>
            <span style={{
              fontSize:8.5, color:hubColor,
              letterSpacing:2, fontWeight:600,
              transition:"color 1.2s ease",
              textShadow:`0 0 8px ${hubColor}`,
            }}>HUB</span>
          </div>
        </div>

        {/* Nodes */}
        {NODES.map((n, i) => {
          const pos   = NODE_POSITIONS[i];
          const isHov = hovered === n.id;
          return (
            <div key={n.id}
              ref={el => nodeRefsRef.current[n.id] = el}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position:"absolute", ...pos,
                width:80, height:80, borderRadius:20,
                background: isHov
                  ? `radial-gradient(circle at 40% 35%, ${n.bg.replace("0.12","0.28")} 0%, rgba(9,11,16,0.95) 100%)`
                  : `radial-gradient(circle at 40% 35%, ${n.bg} 0%, rgba(9,11,16,0.9) 100%)`,
                border:`1.5px solid ${isHov ? n.color : n.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexDirection:"column", gap:5,
                zIndex:15, cursor:"pointer",
                transform: isHov ? "scale(1.15) translateY(-6px)" : "scale(1)",
                boxShadow: isHov
                  ? `0 12px 36px ${n.glow.replace("0.6","0.3")}, 0 0 0 1px ${n.color}44`
                  : `0 4px 14px rgba(0,0,0,0.5)`,
                transition:"all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
                animation:`hubNodeFloat 5s ease-in-out ${n.delay} infinite`,
              }}
            >
              {n.icon(n.color)}
              <span style={{
                fontSize:8.5,
                color: isHov ? n.color : "rgba(255,255,255,0.5)",
                letterSpacing:1.2, fontWeight:600,
                textTransform:"uppercase",
                textShadow: isHov ? `0 0 8px ${n.color}` : "none",
                transition:"all 0.28s ease",
              }}>{n.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{
        height:1, margin:"0 24px",
        background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }}/>

      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        gap:20, padding:"14px 24px", flexWrap:"wrap",
      }}>
        {NODES.map(n => (
          <div key={n.id}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display:"flex", alignItems:"center", gap:6,
              fontSize:9.5, color:"rgba(255,255,255,0.4)",
              letterSpacing:1, textTransform:"uppercase",
              cursor:"default", transition:"color 0.2s",
            }}
          >
            <div style={{
              width:7, height:7, borderRadius:"50%",
              background:n.color, boxShadow:`0 0 6px ${n.color}`,
            }}/>
            {n.label}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes hubRingSpin { to { transform: rotate(360deg); } }
        @keyframes hubNodeFloat {
          0%,100% { margin-top: 0; }
          50%      { margin-top: -6px; }
        }
      `}</style>
    </div>
  );
}
