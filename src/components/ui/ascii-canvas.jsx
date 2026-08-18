import { useEffect, useRef } from "react";
import { reduced } from "../../lib/motion.js";

/**
 * ASCII character-grid canvas.
 *
 * Renders a source into a grid of monospace glyphs, brightness mapped onto a
 * density ramp, with a slight barrel curve so the grid bows like a CRT.
 *
 * The source is procedural by default: a lit head and shoulders figure that
 * breathes and sways. Pass `src` (an image or video URL) to render a real
 * photo or reel through the same grid instead, which is the intent once a
 * headshot exists at /public/ron.jpg.
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

    let mediaFailed = false;

    if (src) {
      const isVideo = /\.(mp4|webm|mov)$/i.test(src);
      media = document.createElement(isVideo ? "video" : "img");
      if (isVideo) {
        Object.assign(media, { muted: true, loop: true, playsInline: true, autoplay: true });
        media.play?.().catch(() => {});
      }
      // no headshot on disk yet, so keep drawing the figure rather than
      // stalling on a broken frame
      media.onerror = () => { mediaFailed = true; };
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

    /* Procedural source: a head and shoulders figure, lit from the upper
       left, breathing slightly. Reads as a person once mapped onto the
       character ramp. Replaced entirely the moment `src` is supplied. */
    const paintPortrait = (time) => {
      const w = cols;
      const h = rows;
      const breathe = Math.sin(time * 0.5) * 0.006;
      const sway = Math.sin(time * 0.33) * 0.008;

      bctx.fillStyle = "#000";
      bctx.fillRect(0, 0, w, h);

      const cx = w * (0.5 + sway);
      const headR = h * (0.19 + breathe);
      const headY = h * 0.36;

      // key light from upper left
      const key = bctx.createRadialGradient(
        cx - headR * 0.75, headY - headR * 0.8, headR * 0.1,
        cx, headY, headR * 3.4
      );
      key.addColorStop(0, "rgba(255,255,255,1)");
      key.addColorStop(0.42, "rgba(190,190,190,1)");
      key.addColorStop(1, "rgba(18,18,18,1)");

      // shoulders
      bctx.save();
      bctx.beginPath();
      const shoulderY = headY + headR * 1.9;
      bctx.moveTo(cx - w * 0.34, h + 2);
      bctx.quadraticCurveTo(cx - w * 0.2, shoulderY, cx - headR * 0.72, shoulderY + h * 0.03);
      bctx.lineTo(cx + headR * 0.72, shoulderY + h * 0.03);
      bctx.quadraticCurveTo(cx + w * 0.2, shoulderY, cx + w * 0.34, h + 2);
      bctx.closePath();
      bctx.fillStyle = key;
      bctx.fill();
      bctx.restore();

      // neck
      bctx.beginPath();
      bctx.rect(cx - headR * 0.32, headY + headR * 0.6, headR * 0.64, headR * 1.4);
      bctx.fillStyle = "rgba(120,120,120,1)";
      bctx.fill();

      // head
      bctx.save();
      bctx.beginPath();
      bctx.ellipse(cx, headY, headR * 0.78, headR, 0, 0, Math.PI * 2);
      bctx.closePath();
      bctx.fillStyle = key;
      bctx.fill();
      bctx.restore();

      // rim light down the right edge of the head
      bctx.save();
      bctx.beginPath();
      bctx.ellipse(cx, headY, headR * 0.78, headR, 0, -Math.PI * 0.45, Math.PI * 0.4);
      bctx.lineWidth = Math.max(1, h * 0.012);
      bctx.strokeStyle = "rgba(255,255,255,0.85)";
      bctx.stroke();
      bctx.restore();

      // shadow under the jaw so the head separates from the shoulders
      bctx.save();
      bctx.beginPath();
      bctx.ellipse(cx, headY + headR * 1.15, headR * 0.7, headR * 0.34, 0, 0, Math.PI * 2);
      bctx.fillStyle = "rgba(0,0,0,0.55)";
      bctx.filter = "blur(1px)";
      bctx.fill();
      bctx.restore();

      // scan shimmer, keeps flat areas alive in the ramp
      const img = bctx.getImageData(0, 0, w, h);
      const d = img.data;
      for (let y = 0; y < h; y++) {
        const band = 1 + Math.sin(y * 0.55 + time * 1.6) * 0.05;
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const grain = ((Math.sin(x * 12.9898 + y * 78.233 + time) * 43758.5453) % 1) * 10;
          const v = Math.max(0, Math.min(255, d[i] * band + grain));
          d[i] = d[i + 1] = d[i + 2] = v;
        }
      }
      bctx.putImageData(img, 0, 0);
    };

    /* Cover fit. Stretching a portrait to the grid squashes the face,
       and the grid is almost never the same aspect as the source. */
    const paintMedia = () => {
      const mw = media.videoWidth || media.naturalWidth;
      const mh = media.videoHeight || media.naturalHeight;
      if (!mw || !mh) return false;

      // the grid draws cells at 1.05x height, so correct for that here
      const gridAspect = cols / (rows * 1.05);
      const mediaAspect = mw / mh;

      let sx = 0, sy = 0, sw = mw, sh = mh;
      if (mediaAspect > gridAspect) {
        sw = mh * gridAspect;
        sx = (mw - sw) / 2;
      } else {
        sh = mw / gridAspect;
        sy = (mh - sh) / 2;
      }

      bctx.fillStyle = "#000";
      bctx.fillRect(0, 0, cols, rows);
      bctx.drawImage(media, sx, sy, sw, sh, 0, 0, cols, rows);
      return true;
    };

    const draw = (time) => {
      const styles = getComputedStyle(canvas);
      const bg = styles.getPropertyValue("--ascii-bg") || "#000";

      ctx.fillStyle = bg.trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (src && !mediaFailed) {
        if (!paintMedia()) paintPortrait(time);
      } else {
        paintPortrait(time);
      }

      const px = bctx.getImageData(0, 0, cols, rows).data;

      ctx.font = `${cell * 1.02}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const midX = cols / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
          if (lum < 0.025) continue;

          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))];
          if (ch === " ") continue;

          // barrel curve: columns bow away from centre
          const dx = (x - midX) / midX;
          const bow = dx * dx * curve * cell * rows * 0.06;

          // mostly neutral, a touch of accent in the hot spots
          const a = Math.min(1, 0.32 + lum * 0.95);
          ctx.fillStyle =
            lum > 0.78
              ? `rgba(255,255,255,${a})`
              : lum > 0.5
                ? `rgba(252,187,0,${a * 0.8})`
                : `rgba(200,200,200,${a * 0.72})`;

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
            "radial-gradient(ellipse 95% 95% at 50% 42%, transparent 68%, #000 100%)",
        }}
      />
    </div>
  );
}
