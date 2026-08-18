import { useEffect, useRef } from "react";
import { reduced } from "../../lib/motion.js";

/**
 * ASCII character-grid canvas.
 *
 * Renders a source into a grid of monospace glyphs, brightness mapped onto a
 * density ramp, with a slight barrel curve so the grid bows like a CRT.
 *
 * The source is procedural by default: three drifting metaballs plus a
 * horizon band. Pass `src` (an image or video URL) to render real footage
 * through the same grid instead.
 *
 * Written from scratch. No gsap, no three, no shader library. It is a
 * downscaled offscreen draw, one getImageData per frame, and fillText.
 */

const RAMP = " .·:-=+*ozUMW%@";

export function AsciiCanvas({
  src,
  cols = 132,
  fps = 24,
  curve = 0.16,
  className = "",
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const still = reduced();

    // offscreen buffer at grid resolution
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d", { willReadFrequently: true });

    let rows = 0;
    let cell = 0;
    let media = null;
    let raf = 0;
    let last = 0;
    let visible = true;
    let t = 0;

    if (src) {
      const isVideo = /\.(mp4|webm|mov)$/i.test(src);
      media = document.createElement(isVideo ? "video" : "img");
      if (isVideo) {
        Object.assign(media, { muted: true, loop: true, playsInline: true, autoplay: true });
        media.play?.().catch(() => {});
      }
      media.crossOrigin = "anonymous";
      media.src = src;
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      cell = w / cols;
      rows = Math.max(8, Math.floor(h / (cell * 1.05)));

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buf.width = cols;
      buf.height = rows;
    };

    /* Procedural source: drifting metaballs over a horizon band. */
    const paintProcedural = (time) => {
      const img = bctx.createImageData(cols, rows);
      const d = img.data;

      const balls = [
        { x: 0.5 + Math.cos(time * 0.21) * 0.26, y: 0.5 + Math.sin(time * 0.17) * 0.2, r: 0.3 },
        { x: 0.5 + Math.cos(time * 0.13 + 2) * 0.34, y: 0.5 + Math.sin(time * 0.24 + 1) * 0.24, r: 0.24 },
        { x: 0.5 + Math.cos(time * 0.31 + 4) * 0.2, y: 0.5 + Math.sin(time * 0.11 + 3) * 0.3, r: 0.19 },
      ];

      for (let y = 0; y < rows; y++) {
        const ny = y / rows;
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;

          let v = 0;
          for (const b of balls) {
            const dx = (nx - b.x) * 1.6;
            const dy = ny - b.y;
            v += (b.r * b.r) / (dx * dx + dy * dy + 0.008);
          }

          // horizon band keeps the mass centred instead of floating
          const band = Math.exp(-Math.pow((ny - 0.52) * 3.4, 2)) * 0.5;
          // fine grain so flat areas still read as texture
          const grain = (Math.sin(x * 12.9898 + y * 78.233 + time) * 43758.5453) % 1;

          let lum = Math.min(1, v * 0.12 + band + Math.abs(grain) * 0.06);
          lum = Math.pow(lum, 1.5);

          const i = (y * cols + x) * 4;
          const c = lum * 255;
          d[i] = c;
          d[i + 1] = c;
          d[i + 2] = c;
          d[i + 3] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);
    };

    const paintMedia = () => {
      const ready = media.videoWidth || media.naturalWidth;
      if (!ready) return false;
      bctx.drawImage(media, 0, 0, cols, rows);
      return true;
    };

    const draw = (time) => {
      const styles = getComputedStyle(canvas);
      const bg = styles.getPropertyValue("--ascii-bg") || "#000";

      ctx.fillStyle = bg.trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (src) {
        if (!paintMedia()) return;
      } else {
        paintProcedural(time);
      }

      const px = bctx.getImageData(0, 0, cols, rows).data;

      ctx.font = `${cell * 1.02}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const midX = cols / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
          if (lum < 0.04) continue;

          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))];
          if (ch === " ") continue;

          // barrel curve: columns bow away from centre
          const dx = (x - midX) / midX;
          const bow = dx * dx * curve * cell * rows * 0.06;

          // mostly neutral, a touch of accent in the hot spots
          const a = Math.min(1, lum * 1.15);
          ctx.fillStyle =
            lum > 0.82
              ? `rgba(255,255,255,${a})`
              : lum > 0.55
                ? `rgba(48,128,255,${a * 0.55})`
                : `rgba(210,210,210,${a * 0.5})`;

          ctx.fillText(ch, x * cell, y * cell * 1.05 + bow);
        }
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - last < 1000 / fps) return;
      last = now;
      t += 0.016;
      draw(t);
    };

    resize();
    if (still) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      resize();
      draw(t);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (media?.pause) media.pause();
    };
  }, [src, cols, fps, curve]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ "--ascii-bg": "#000000" }}
        className="block h-full w-full"
      />
      {/* edge falloff so the grid dissolves instead of hard-cutting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 50%, transparent 40%, #000 100%)",
        }}
      />
    </div>
  );
}
