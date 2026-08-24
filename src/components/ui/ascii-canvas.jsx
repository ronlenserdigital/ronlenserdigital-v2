import { useEffect, useRef } from "react";
import { reduced } from "../../lib/motion.js";

/**
 * ASCII character-grid canvas.
 *
 * Renders a source into a grid of monospace glyphs, brightness mapped onto a
 * density ramp, with a barrel curve so the grid bows like a CRT.
 *
 * Three motions, all driven off one `reveal` value per cell:
 *
 *   RESOLVE   on load the grid is pure noise and the image assembles out of
 *             it, cell by cell, in an order fixed by a per-cell threshold
 *             field. Not a fade: each glyph scrambles then locks.
 *   BREATHE   once settled, cells flicker on a slow sine offset by their own
 *             noise value, so the portrait never looks like a static png.
 *   DISSOLVE  scrolling past the hero runs resolve backwards and the face
 *             falls apart into noise again.
 *
 * No dependencies. A downscaled offscreen draw, one getImageData per frame,
 * and fillText.
 */

const RAMP =
  " .'`^\",:;~-_+<>i!lI?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const NOISE_GLYPHS = "01#%&*+=-<>/\\|?zUMW@";

export function AsciiCanvas({
  src,
  cols = 132,
  fps = 24,
  curve = 0.16,
  intro = 1900,
  label = "",
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

    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d", { willReadFrequently: true });

    let rows = 0;
    let cell = 0;
    let media = null;
    let mediaFailed = false;
    let raf = 0;
    let last = 0;
    let visible = true;
    let scrollFade = 1;
    const t0 = performance.now();

    /* Per cell threshold field. Fixed for the life of the grid, so the
       resolve always assembles in the same order instead of sparkling
       randomly. Biased toward the centre so the face lands before the
       edges do. */
    let field = new Float32Array(0);

    if (src) {
      const isVideo = /\.(mp4|webm|mov)$/i.test(src);
      media = document.createElement(isVideo ? "video" : "img");
      if (isVideo) {
        Object.assign(media, { muted: true, loop: true, playsInline: true, autoplay: true });
        media.play?.().catch(() => {});
      }
      media.onerror = () => {
        mediaFailed = true;
        wrap.classList.add("is-painted");
      };
      media.onload = media.onloadeddata = () => wrap.classList.add("is-painted");
      media.src = src;
    }

    const buildField = () => {
      field = new Float32Array(grid * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < grid; x++) {
          const dx = (x / grid - 0.5) * 2;
          const dy = (y / rows - 0.5) * 2;
          const dist = Math.sqrt(dx * dx + dy * dy) / 1.414;
          const rnd = Math.abs((Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1);
          // centre resolves first, edges last, with jitter so it is not a circle
          field[y * grid + x] = Math.min(1, dist * 0.62 + rnd * 0.5);
        }
      }
    };

    let grid = cols;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      // keep cells around 6px wide. A phone gets fewer columns than a
      // desktop rather than an unreadable smear at the requested count.
      grid = Math.max(70, Math.min(cols, Math.round(w / 6)));

      cell = w / grid;
      rows = Math.max(8, Math.floor(h / (cell * 1.05)));

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buf.width = grid;
      buf.height = rows;
      buildField();
    };

    /* Procedural stand in: a lit head and shoulders figure. Only used when
       no src is given, or the file is missing. */
    const paintPortrait = (time) => {
      const w = grid;
      const h = rows;
      const breathe = Math.sin(time * 0.5) * 0.006;
      const sway = Math.sin(time * 0.33) * 0.008;

      bctx.fillStyle = "#000";
      bctx.fillRect(0, 0, w, h);

      const cx = w * (0.5 + sway);
      const headR = h * (0.19 + breathe);
      const headY = h * 0.36;

      const key = bctx.createRadialGradient(
        cx - headR * 0.75, headY - headR * 0.8, headR * 0.1,
        cx, headY, headR * 3.4
      );
      key.addColorStop(0, "rgba(255,255,255,1)");
      key.addColorStop(0.42, "rgba(190,190,190,1)");
      key.addColorStop(1, "rgba(18,18,18,1)");

      bctx.beginPath();
      const shoulderY = headY + headR * 1.9;
      bctx.moveTo(cx - w * 0.34, h + 2);
      bctx.quadraticCurveTo(cx - w * 0.2, shoulderY, cx - headR * 0.72, shoulderY + h * 0.03);
      bctx.lineTo(cx + headR * 0.72, shoulderY + h * 0.03);
      bctx.quadraticCurveTo(cx + w * 0.2, shoulderY, cx + w * 0.34, h + 2);
      bctx.closePath();
      bctx.fillStyle = key;
      bctx.fill();

      bctx.beginPath();
      bctx.ellipse(cx, headY, headR * 0.78, headR, 0, 0, Math.PI * 2);
      bctx.fillStyle = key;
      bctx.fill();
    };

    /* Cover fit. Stretching a portrait to the grid squashes the face. */
    const paintMedia = () => {
      const mw = media.videoWidth || media.naturalWidth;
      const mh = media.videoHeight || media.naturalHeight;
      if (!mw || !mh) return false;

      const gridAspect = grid / (rows * 1.05);
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
      bctx.fillRect(0, 0, grid, rows);
      bctx.drawImage(media, sx, sy, sw, sh, 0, 0, grid, rows);
      return true;
    };

    const draw = (now) => {
      const time = (now - t0) / 1000;

      // resolve on load, eased, then held
      const introP = still ? 1 : Math.min(1, (now - t0) / intro);
      const eased = 1 - Math.pow(1 - introP, 3);
      const reveal = eased * scrollFade;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (src && !mediaFailed) {
        if (!paintMedia()) paintPortrait(time);
      } else {
        paintPortrait(time);
      }

      const px = bctx.getImageData(0, 0, grid, rows).data;

      ctx.font = `${cell * 1.02}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const midX = grid / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < grid; x++) {
          const idx = y * grid + x;
          const i = idx * 4;
          const lum = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;

          const threshold = field[idx];
          const settled = reveal > threshold;

          // cells not yet resolved show drifting noise glyphs
          if (!settled) {
            if (reveal < threshold - 0.42) continue;
            const flick = Math.abs(
              (Math.sin(x * 91.7 + y * 47.3 + Math.floor(time * 11)) * 43758.5453) % 1
            );
            if (flick < 0.55) continue;
            const ch = NOISE_GLYPHS[Math.floor(flick * NOISE_GLYPHS.length)];
            const dx0 = (x - midX) / midX;
            ctx.fillStyle = `rgba(170,170,170,${0.12 + flick * 0.16})`;
            ctx.fillText(ch, x * cell, y * cell * 1.05 + dx0 * dx0 * curve * cell * rows * 0.06);
            continue;
          }

          if (lum < 0.025) continue;

          // breathe: slow per-cell flicker so it never reads as a still image
          const pulse = still ? 1 : 0.9 + Math.sin(time * 2.2 + threshold * 12) * 0.1;
          const l = Math.min(1, lum * pulse);

          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(l * RAMP.length))];
          if (ch === " ") continue;

          const dx = (x - midX) / midX;
          const bow = dx * dx * curve * cell * rows * 0.06;

          // fade each cell in over the moment it settles
          const age = Math.min(1, (reveal - threshold) * 7);
          const a = Math.min(1, 0.32 + l * 0.95) * age;

          // colour comes from the source pixel: the face renders in real
          // skin tone, the hood and jacket stay neutral on their own
          let cr = px[i], cg = px[i + 1], cb = px[i + 2];

          // lift toward white in the hot spots so highlights still pop
          if (l > 0.86) {
            const k = (l - 0.86) / 0.14;
            cr += (255 - cr) * k;
            cg += (255 - cg) * k;
            cb += (255 - cb) * k;
          }

          // floor the darkest cells so they read as glyphs, not mud
          const lift = 62 * (1 - l);
          ctx.fillStyle = `rgba(${Math.min(255, cr + lift) | 0},${
            Math.min(255, cg + lift) | 0
          },${Math.min(255, cb + lift) | 0},${a})`;

          ctx.fillText(ch, x * cell, y * cell * 1.05 + bow);
        }
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - last < 1000 / fps) return;
      last = now;
      draw(now);
    };

    /* Scroll dissolve: run the resolve backwards as the hero leaves. */
    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.85)));
      scrollFade = 1 - p;
    };

    resize();
    onScroll();

    if (still) {
      draw(performance.now() + intro);
    } else {
      raf = requestAnimationFrame(loop);
    }

    // the image may land after the first frames; redraw when it does
    if (media) media.onload = () => draw(performance.now());

    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      ro.disconnect();
      if (media?.pause) media.pause();
    };
  }, [src, cols, fps, curve, intro]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
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
