"use client";

// ─────────────────────────────────────────────────────────────────
// SecurityBackground.tsx
// Full-screen animated canvas background with security/hacker theme.
// Used in: app/layout.tsx (wraps entire portfolio)
//
// Layers:
//   1. Matrix rain columns  → falling green characters
//   2. Code fragments       → floating security-related text
//   3. Network nodes        → small blue dots with connection lines
//   4. Scan line            → slow horizontal light sweep
//   5. Corner brackets      → static decorative frame corners
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";

export default function SecurityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Canvas size ───────────────────────────────────────────────
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // ── Colors ────────────────────────────────────────────────────
    const GREEN = { r: 0,  g: 255, b: 100 };
    const BLUE  = { r: 59, g: 130, b: 246 };

    // ─────────────────────────────────────────────────────────────
    // 1. MATRIX RAIN COLUMNS
    // ─────────────────────────────────────────────────────────────
    const CHARS = "01アイウエオカキクケコ{}[]<>/\\=+*#@!?;:";

    class MatrixColumn {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      length: number = 0;
      chars: string[] = [];
      opacity: number = 0;
      timer: number = 0;
      changeEvery: number = 0;

      constructor() { this.reset(true); }

      reset(init = false) {
        this.x           = Math.floor(Math.random() * Math.floor(W / 18)) * 18;
        this.y           = init ? Math.random() * H : -40;
        this.speed       = Math.random() * 0.6 + 0.3;
        this.length      = Math.floor(Math.random() * 12 + 5);
        this.chars       = Array.from({ length: this.length }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)]
        );
        this.opacity     = Math.random() * 0.12 + 0.04;
        this.timer       = 0;
        this.changeEvery = Math.floor(Math.random() * 80 + 40);
      }

      update() {
        this.y += this.speed;
        this.timer++;
        if (this.timer % this.changeEvery === 0) {
          const i = Math.floor(Math.random() * this.chars.length);
          this.chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        if (this.y > H + this.length * 18) this.reset();
      }

      draw() {
        ctx!.font = '13px "Courier New"';
        for (let i = 0; i < this.chars.length; i++) {
          const cy = this.y - i * 18;
          if (cy < -18 || cy > H + 18) continue;
          const fade   = 1 - i / this.chars.length;
          const isHead = i === 0;
          ctx!.save();
          ctx!.globalAlpha = isHead
            ? Math.min(1, this.opacity * 6)
            : this.opacity * fade * 0.9;
          ctx!.fillStyle = isHead
            ? "rgb(180,255,200)"
            : `rgb(${GREEN.r},${GREEN.g},${GREEN.b})`;
          if (isHead) {
            ctx!.shadowBlur  = 8;
            ctx!.shadowColor = `rgb(${GREEN.r},${GREEN.g},${GREEN.b})`;
          }
          ctx!.fillText(this.chars[i], this.x, cy);
          ctx!.restore();
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 2. FLOATING CODE FRAGMENTS
    // ─────────────────────────────────────────────────────────────
    const codeFragments = [
      "root@system:~#", "ssh -i key.pem",    "nmap -sV 10.0.0.1",
      "SELECT * FROM users", "JWT_SECRET=",   "bcrypt.hash(pwd,12)",
      "403 Forbidden",    "TLS 1.3",          "gpg --encrypt",
      "chmod 600",        "sudo iptables",    "AES-256-GCM",
      '{"status":"secure"}', "OWASP Top 10", "rate_limit: 5/min",
    ];

    class CodeFragment {
      x: number = 0;
      y: number = 0;
      vy: number = 0;
      text: string = "";
      opacity: number = 0;
      size: number = 0;
      color: string = "";

      constructor() { this.reset(true); }

      reset(init = false) {
        this.text    = codeFragments[Math.floor(Math.random() * codeFragments.length)];
        this.x       = Math.random() * W;
        this.y       = init ? Math.random() * H : H + 20;
        this.vy      = -(Math.random() * 0.15 + 0.04);
        this.opacity = Math.random() * 0.07 + 0.02;
        this.size    = Math.random() > 0.7 ? 9 : 8;
        this.color   = Math.random() > 0.75
          ? `rgb(${BLUE.r},${BLUE.g},${BLUE.b})`
          : `rgb(${GREEN.r},${GREEN.g},${GREEN.b})`;
      }

      update() {
        this.y += this.vy;
        if (this.y < -20) this.reset();
      }

      draw() {
        ctx!.save();
        ctx!.globalAlpha = this.opacity;
        ctx!.fillStyle   = this.color;
        ctx!.font        = `${this.size}px "Courier New"`;
        ctx!.fillText(this.text, this.x, this.y);
        ctx!.restore();
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. NETWORK NODES + EDGES
    // ─────────────────────────────────────────────────────────────
    class Node {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      r: number = 0;
      alpha: number = 0;
      pulse: number = 0;

      constructor() { this.reset(true); }

      reset(init = false) {
        this.x     = Math.random() * W;
        this.y     = init ? Math.random() * H : H + 10;
        this.vx    = (Math.random() - 0.5) * 0.08;
        this.vy    = -(Math.random() * 0.12 + 0.04);
        this.r     = Math.random() * 1.2 + 0.5;
        this.alpha = Math.random() * 0.2 + 0.06;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x     += this.vx;
        this.y     += this.vy;
        this.pulse += 0.01;
        if (this.y < -10) this.reset();
      }

      draw() {
        const a = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse));
        ctx!.save();
        ctx!.globalAlpha = a;
        ctx!.fillStyle   = `rgb(${BLUE.r},${BLUE.g},${BLUE.b})`;
        ctx!.shadowBlur  = 8;
        ctx!.shadowColor = `rgb(${BLUE.r},${BLUE.g},${BLUE.b})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    const drawEdges = (nodes: Node[]) => {
      const max = 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < max) {
            ctx!.save();
            ctx!.globalAlpha = (1 - d / max) * 0.06;
            ctx!.strokeStyle = `rgb(${BLUE.r},${BLUE.g},${BLUE.b})`;
            ctx!.lineWidth   = 0.4;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
            ctx!.restore();
          }
        }
      }
    };

    // ─────────────────────────────────────────────────────────────
    // 5. CORNER BRACKETS
    // ─────────────────────────────────────────────────────────────
    const drawBrackets = () => {
      const s = 20, p = 24;
      ctx!.save();
      ctx!.strokeStyle = "rgba(0,255,100,0.12)";
      ctx!.lineWidth   = 0.8;
      // top-left
      ctx!.beginPath(); ctx!.moveTo(p, p+s); ctx!.lineTo(p,p); ctx!.lineTo(p+s,p); ctx!.stroke();
      // top-right
      ctx!.beginPath(); ctx!.moveTo(W-p-s,p); ctx!.lineTo(W-p,p); ctx!.lineTo(W-p,p+s); ctx!.stroke();
      // bottom-left
      ctx!.beginPath(); ctx!.moveTo(p,H-p-s); ctx!.lineTo(p,H-p); ctx!.lineTo(p+s,H-p); ctx!.stroke();
      // bottom-right
      ctx!.beginPath(); ctx!.moveTo(W-p-s,H-p); ctx!.lineTo(W-p,H-p); ctx!.lineTo(W-p,H-p-s); ctx!.stroke();
      ctx!.restore();
    };

    // ── Initialize ────────────────────────────────────────────────
    const activeCols = Math.floor((W / 18) * 0.28);
    const columns    = Array.from({ length: activeCols }, () => new MatrixColumn());
    const fragments  = Array.from({ length: 14 },         () => new CodeFragment());
    const nodes      = Array.from({ length: 40 },         () => new Node());

    // ── Animation loop ────────────────────────────────────────────
    let animId: number;
    const loop = () => {
      ctx!.fillStyle = "rgba(10,10,10,0.18)";
      ctx!.fillRect(0, 0, W, H);
      drawEdges(nodes);
      nodes.forEach(n    => { n.update(); n.draw(); });
      columns.forEach(c  => { c.update(); c.draw(); });
      fragments.forEach(f => { f.update(); f.draw(); });
      drawBrackets();
      animId = requestAnimationFrame(loop);
    };
    loop();

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "100vw",
        height:        "100vh",
        zIndex:        0,
        pointerEvents: "none",
      }}
    />
  );
}
