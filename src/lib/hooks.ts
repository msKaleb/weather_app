import { useEffect } from "react";
import { DependencyList } from "react";

/**
 * @description Simulates a debounced useEffect()
 * @param effect The effect callback to be used in useEffect()
 * @param deps The array of dependencies to pass to useEffect()
 * @param delay The desired delay, in ms
 */
export function useDebouncedEffect(
  effect: () => void,
  deps: DependencyList,
  delay: number
) {
  useEffect(() => {
    const delayHandler = setTimeout(() => effect(), delay);
    return () => clearTimeout(delayHandler);
  }, [...deps, delay]);
}
