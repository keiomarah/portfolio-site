import { useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-=<>?/\\|";
const SCRAMBLE_SPEED = 40; // ms between character swaps
const SCRAMBLE_DURATION = 400; // ms total flip time per letter

function ScrambleLetter({ char }) {
  const spanRef = useRef(null);
  const scrambling = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (char === " " || scrambling.current) return;
    scrambling.current = true;

    const el = spanRef.current;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      if (elapsed >= SCRAMBLE_DURATION) {
        el.textContent = char;
        scrambling.current = false;
        return;
      }
      el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      setTimeout(() => requestAnimationFrame(tick), SCRAMBLE_SPEED);
    }
    requestAnimationFrame(tick);
  }, [char]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={handleMouseEnter}
      style={{
        display: "inline-block",
        width: char === " " ? "0.4em" : undefined,
      }}
    >
      {char}
    </span>
  );
}

export default function ScrambleHero({
  text = "I’m Keiomarah Chigudu, a Computer Science Student, Full-Stack Developer and Aspiring AI Engineer.",
}) {
  return (
    <h1
      style={{
        fontFamily: "'Inter', monospace",
        fontSize: "2rem",
        color: "white",
        letterSpacing: "0.02em",
        margin: 0,
        userSelect: "none",
        textAlign: "justify",
        width: " clamp(17rem, calc(8.727rem + 36.364vw), 36rem)",
      }}
    >
      {[...text].map((char, i) => (
        <ScrambleLetter key={i} char={char} />
      ))}
    </h1>
  );
}
