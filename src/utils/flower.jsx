import { useEffect, useRef } from "react";
import asciiArt from "../assets/flower.txt?raw";

class AsciiRevealCanvas {
  constructor(canvas, finalArt, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.lines = finalArt.replace(/^\n/, "").split("\n");
    this.chars = ".:;+=~*#@".split("");

    this.fontSize = options.fontSize || 12;
    this.lineHeight = options.lineHeight || this.fontSize * 1.15;
    this.charWidth = options.charWidth || this.fontSize * 0.6;
    this.color = options.color || "#ffeb36";
    this.font = options.font || `${this.fontSize}px monospace`;

    this.revealDuration = options.revealDuration || 1500;
    this.idleFlickerCount = options.idleFlickerCount || 12;
    this.idleFlickerInterval = options.idleFlickerInterval || 200;
    this.idleFlickerLife = options.idleFlickerLife || 80;

    this.grid = this.lines.map((line) => line.split(""));

    this.setupCanvas();
    this.compileIn();
  }

  setupCanvas() {
    const maxCols = Math.max(...this.lines.map((l) => l.length));
    const dpr = window.devicePixelRatio || 1;

    const width = maxCols * this.charWidth;
    const height = this.lines.length * this.lineHeight;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;

    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";

    this.ctx.scale(dpr, dpr);
    this.ctx.font = this.font;
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = this.color;
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  draw(grid) {
    const { ctx, canvas } = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.color;

    grid.forEach((row, y) => {
      row.forEach((ch, x) => {
        if (ch === " " || !ch) return;

        ctx.fillText(ch, x * this.charWidth, y * this.lineHeight);
      });
    });
  }

  compileIn() {
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;

      const progress = Math.min(elapsed / this.revealDuration, 1);

      const displayGrid = this.lines.map((line, y) =>
        line.split("").map((finalChar, x) => {
          if (finalChar === " ") return " ";

          const posRatio = (y * 3 + x) / (this.lines.length * 3 + line.length);

          const cellProgress = Math.max(
            0,
            Math.min(1, (progress - posRatio * 0.5) / 0.5),
          );

          return cellProgress >= 1
            ? finalChar
            : Math.random() < cellProgress
              ? finalChar
              : this.randomChar();
        }),
      );

      this.draw(displayGrid);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(tick);
      } else {
        this.grid = this.lines.map((l) => l.split(""));
        this.draw(this.grid);
        this.startIdleFlicker();
      }
    };

    this.animationFrame = requestAnimationFrame(tick);
  }

  startIdleFlicker() {
    const validPositions = [];

    this.lines.forEach((line, y) => {
      line.split("").forEach((c, x) => {
        if (c !== " ") {
          validPositions.push([y, x]);
        }
      });
    });

    if (!validPositions.length) return;

    this.flickerInterval = setInterval(() => {
      const displayGrid = this.grid.map((row) => [...row]);

      for (let i = 0; i < this.idleFlickerCount; i++) {
        const [y, x] =
          validPositions[Math.floor(Math.random() * validPositions.length)];

        displayGrid[y][x] = this.randomChar();
      }

      this.draw(displayGrid);

      this.flickerTimeout = setTimeout(() => {
        this.draw(this.grid);
      }, this.idleFlickerLife);
    }, this.idleFlickerInterval);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    clearInterval(this.flickerInterval);
    clearTimeout(this.flickerTimeout);
  }
}

export default function AsciiReveal() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const animation = new AsciiRevealCanvas(canvasRef.current, asciiArt, {
      fontSize: 16,
      color: "#fff70c",
      revealDuration: 1500,
      idleFlickerCount: 12,
      idleFlickerInterval: 200,
      idleFlickerLife: 80,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} id="ascii-hero" className="ascii-art" />;
}
