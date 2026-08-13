import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";


export function useReveal(options = {}) {
  const ref = useRef(null);
  // Without IntersectionObserver everything is visible from the start.
  const [shown, setShown] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || shown || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1, ...options }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown, options]);

  return [ref, shown];
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function useCountUp(value, { duration = 1400, decimals = 0 } = {}) {
  const [ref, shown] = useReveal();
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!shown || reduce) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Number((value * eased).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, reduce, value, duration, decimals]);

  return [ref, reduce && shown ? value : n];
}

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function useEscape(handler, active = true) {
  useEffect(() => {
    if (!active) return;
    const on = (e) => e.key === "Escape" && handler();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [handler, active]);
}

export function useOutsideClick(handler, active = true) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const on = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", on);
    return () => document.removeEventListener("mousedown", on);
  }, [handler, active]);
  return ref;
}
export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }, [key, value]);

  return [value, setValue];
}

export function useLoading(deps = [], ms = 550) {
  const key = JSON.stringify(deps);
  const [readyKey, setReadyKey] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setReadyKey(key), ms);
    return () => clearTimeout(t);
  }, [key, ms]);

  return readyKey !== key;
}

export function useInterval(fn, delay) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  }, [fn]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
    }
  }, []);
  return [copied, copy];
}
