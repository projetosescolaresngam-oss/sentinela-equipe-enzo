import { useRef, useCallback } from 'react';
import { centerElementInViewport, smoothScrollToElement, ScrollOptions } from '../utils/scrollHelper';

export interface UseScrollIntoViewOptions {
  /** Target position: 'center' (default), 'top', or 'auto' */
  position?: 'center' | 'top' | 'auto';
  /** Behavior: 'smooth' (default) or 'auto' */
  behavior?: ScrollBehavior;
  /** Top offset in px to account for sticky navbar (default: 80) */
  topOffset?: number;
  /** Bottom margin in px (default: 24) */
  bottomOffset?: number;
  /** Optional delay before scroll starts in ms (default: 0) */
  delay?: number;
  /** Callback after scroll initiates or completes */
  onComplete?: () => void;
}

/**
 * Reusable Custom Hook `useScrollIntoView`
 * 
 * Leverages `useRef` and smooth viewport centering (`block: 'center'`)
 * to reliably align UI elements, cards, modals and forms in the active view.
 * 
 * @example
 * ```tsx
 * const { ref, scrollIntoView, center } = useScrollIntoView<HTMLDivElement>();
 * 
 * // Attach to element:
 * <div ref={ref}>...</div>
 * 
 * // Trigger programmatic scroll:
 * scrollIntoView({ onComplete: () => openModal() });
 * // or dynamically by element or selector:
 * center('#badge-card-123', 0, () => openModal());
 * ```
 */
export function useScrollIntoView<T extends HTMLElement = HTMLDivElement>(
  defaultOptions: UseScrollIntoViewOptions = {}
) {
  const ref = useRef<T | null>(null);

  /**
   * Smoothly scrolls the attached ref element (or an explicitly provided target element/selector)
   * into view, with block: 'center' as default.
   */
  const scrollIntoView = useCallback(
    (
      targetOrOptions?: HTMLElement | string | null | UseScrollIntoViewOptions,
      customOptions?: UseScrollIntoViewOptions
    ) => {
      let targetEl: HTMLElement | string | null = null;
      let options: UseScrollIntoViewOptions = { ...defaultOptions };

      if (typeof targetOrOptions === 'string' || (targetOrOptions && 'nodeType' in targetOrOptions)) {
        targetEl = targetOrOptions as HTMLElement | string;
        if (customOptions) {
          options = { ...options, ...customOptions };
        }
      } else if (targetOrOptions && typeof targetOrOptions === 'object') {
        options = { ...options, ...targetOrOptions };
        targetEl = ref.current;
      } else {
        targetEl = ref.current;
      }

      const {
        position = 'center',
        behavior = 'smooth',
        topOffset = 80,
        bottomOffset = 24,
        delay = 0,
        onComplete
      } = options;

      if (position === 'center') {
        centerElementInViewport(targetEl, {
          topOffset,
          bottomOffset,
          delay,
          behavior,
          onComplete
        });
      } else {
        smoothScrollToElement(targetEl, {
          position,
          behavior,
          topOffset,
          bottomOffset,
          delay,
          onComplete
        });
      }
    },
    [defaultOptions]
  );

  /**
   * Dedicated shorthand to center the target element vertically
   */
  const center = useCallback(
    (customTarget?: HTMLElement | string | null, customDelay?: number, onComplete?: () => void) => {
      scrollIntoView(customTarget || ref.current, {
        position: 'center',
        delay: customDelay ?? defaultOptions.delay ?? 0,
        onComplete
      });
    },
    [scrollIntoView, defaultOptions.delay]
  );

  return {
    ref,
    scrollIntoView,
    center
  };
}

export default useScrollIntoView;
