import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to every element inside the container
 * that carries a reveal class (`reveal`, `reveal-left`, `reveal-right`,
 * `reveal-scale`).  Once an element crosses the threshold it gets the
 * `visible` class added, triggering the CSS transition defined in App.css.
 *
 * @param {object} options
 * @param {number}  [options.threshold=0.15]  – how much of the element must
 *                                              be visible before triggering
 * @param {string}  [options.rootMargin='0px'] – IntersectionObserver rootMargin
 * @param {boolean} [options.once=true]        – remove observer after first trigger
 *
 * @returns {React.RefObject} – attach this ref to the wrapper element
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const REVEAL_SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    const targets = Array.from(container.querySelectorAll(REVEAL_SELECTORS));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return containerRef;
}

/**
 * useRevealRef
 *
 * Simpler variant — pass a single element ref and it will be observed
 * directly (no container scan needed).
 */
export function useRevealRef({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove('visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
