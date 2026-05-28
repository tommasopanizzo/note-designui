"use client";

import { useEffect, useState } from "react";

/** Desktop mouse/trackpad: real hover. */
const DESKTOP_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export type PointerEnvironment = "desktop" | "touch" | null;

export function usePointerEnvironment() {
  const [env, setEnv] = useState<PointerEnvironment>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_POINTER_QUERY);

    const update = () => {
      setEnv(mq.matches ? "desktop" : "touch");
    };

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return {
    ready: env !== null,
    isDesktop: env === "desktop",
    isTouch: env === "touch",
  };
}

/** @deprecated Use usePointerEnvironment */
export function useFinePointer() {
  const { isDesktop } = usePointerEnvironment();
  return isDesktop;
}
