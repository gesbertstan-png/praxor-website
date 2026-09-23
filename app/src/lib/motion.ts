import { useEffect, useRef, useState } from "react";

const REVEAL_SELECTOR = ".reveal, .rule, .reveal-clip, .plan";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Marks reveal targets with .is-in as they enter the viewport. Runs again on every
 * navigation (key = pathname). Content stays visible when JS is unavailable because
 * the hidden state only applies under html.js.
 */
export function useRevealObserver(key: string) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (el) => !el.classList.contains("is-in"),
    );
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return scrolled;
}

/**
 * True while the band under the fixed header belongs to a `.dark` section, so the
 * header can switch to its night-blue variant. Re-evaluated on scroll and navigation.
 */
export function useOverDark(key: string, probeY = 34) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const stack = document.elementsFromPoint(Math.round(window.innerWidth / 2), probeY);
      const below = stack.find((el) => !el.closest(".site-header, .mobile-menu"));
      setDark(Boolean(below?.closest(".dark")));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key, probeY]);
  return dark;
}

/**
 * Scroll-spy: returns the index of the item whose element crosses the middle band
 * of the viewport. `initial` is used during SSR and before the first intersection.
 */
export function useActiveIndex(selector: string, initial = 0) {
  const [active, setActive] = useState(initial);
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!items.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return active;
}

/**
 * Counts up to `value` the first time the number scrolls into view. Server render and
 * no-JS show the final value; numbers already on screen at load are left untouched.
 */
export function useCountUp<T extends HTMLElement>(value: number, duration = 1100) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = "0";
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(eased * value));
          if (t < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      el.textContent = String(value);
    };
  }, [value, duration]);
  return ref;
}
