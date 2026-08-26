// src/hooks/useInViewOnce.js
import { useEffect, useRef, useState } from "react";

// Returns a ref to attach to an element, and a boolean that flips to
// true the first time that element scrolls into view. It never flips
// back, so the animation only ever plays once.
export default function useInViewOnce(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, options]);

  return [ref, inView];
}
