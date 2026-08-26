/**
 * Global Smooth Scroll & Viewport Centering Utilities
 * 
 * Ensures that whenever any interactive element opens, expands, reveals or alters content,
 * the viewport smoothly glides to leave that content comfortably centered and immediately visible,
 * taking sticky headers and container boundaries into account.
 */

export interface ScrollOptions {
  /** Target position: 'center' (default), 'top', or 'auto' (centers if fits, tops if tall) */
  position?: 'center' | 'top' | 'auto';
  /** Behavior: 'smooth' (default) or 'auto' (instant) */
  behavior?: ScrollBehavior;
  /** Custom top offset in pixels to clear sticky navbar and top banners (default: 80) */
  topOffset?: number;
  /** Bottom margin in pixels (default: 24) */
  bottomOffset?: number;
  /** Optional delay in ms to allow React state, animations and DOM reflow to finish (default: 0) */
  delay?: number;
  /** Optional custom scrollable container */
  container?: HTMLElement | null;
  /** Callback fired after scroll action initiates */
  onComplete?: () => void;
}

/**
 * Finds the nearest scrollable parent container for an element
 */
export function getScrollParent(node: HTMLElement | null): HTMLElement | Window {
  if (!node || typeof window === 'undefined') return window;
  let parent = node.parentElement;
  while (parent && parent !== document.body && parent !== document.documentElement) {
    const style = window.getComputedStyle(parent);
    const overflow = style.overflow + style.overflowY;
    if (/(auto|scroll)/.test(overflow) && parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return window;
}

/**
 * Center an element smoothly in the visible viewport, taking sticky headers into account.
 */
export function centerElementInViewport(
  target: HTMLElement | string | null | undefined,
  options: {
    topOffset?: number;
    bottomOffset?: number;
    delay?: number;
    behavior?: ScrollBehavior;
    onComplete?: () => void;
  } = {}
): void {
  if (typeof window === 'undefined') return;

  const {
    topOffset = 80,
    bottomOffset = 24,
    delay = 0,
    behavior = 'smooth',
    onComplete
  } = options;

  const execute = () => {
    let el: HTMLElement | null = null;
    if (typeof target === 'string') {
      el = document.querySelector<HTMLElement>(target);
    } else if (target && 'nodeType' in target) {
      el = target;
    }

    if (!el) {
      if (onComplete) onComplete();
      return;
    }

    // 1. Prepare scroll margins to account for top navbar & bottom spacing
    try {
      el.style.scrollMarginTop = `${topOffset + 12}px`;
      el.style.scrollMarginBottom = `${bottomOffset + 12}px`;
    } catch (_) {}

    // 2. Native smooth centering
    try {
      el.scrollIntoView({
        behavior,
        block: 'center',
        inline: 'nearest'
      });
    } catch (_) {}

    // 3. Robust mathematical calculation for scrolling containers & document root
    const scrollContainer = getScrollParent(el);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollingEl = document.scrollingElement || document.documentElement || document.body;

    if (scrollContainer === window || scrollContainer === document.body || scrollContainer === document.documentElement) {
      const rect = el.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || (scrollingEl ? scrollingEl.scrollTop : 0) || 0;
      const elementAbsoluteTop = rect.top + currentScrollY;
      const elementHeight = rect.height;

      // Available vertical viewport space considering sticky top header
      const availableHeight = Math.max(180, windowHeight - topOffset - bottomOffset);
      
      let targetScrollY: number;
      if (elementHeight >= availableHeight) {
        // Element is taller than available height: align top just below navbar
        targetScrollY = Math.max(0, elementAbsoluteTop - topOffset - 12);
      } else {
        // Center the element in the available viewport space below navbar
        const verticalCenterOffset = topOffset + (availableHeight - elementHeight) / 2;
        targetScrollY = Math.max(0, elementAbsoluteTop - verticalCenterOffset);
      }

      window.scrollTo({
        top: targetScrollY,
        behavior
      });

      if (document.documentElement && document.documentElement.scrollTop !== undefined) {
        try {
          document.documentElement.scrollTo({
            top: targetScrollY,
            behavior
          });
        } catch (_) {}
      }

      if (document.body && document.body.scrollTop !== undefined) {
        try {
          document.body.scrollTo({
            top: targetScrollY,
            behavior
          });
        } catch (_) {}
      }

      if (scrollingEl) {
        try {
          scrollingEl.scrollTo({
            top: targetScrollY,
            behavior
          });
        } catch (_) {}
      }

    } else if (scrollContainer instanceof HTMLElement) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;
      const elementHeight = elRect.height;

      let targetScrollTop: number;
      if (elementHeight >= containerHeight) {
        targetScrollTop = Math.max(0, relativeTop - 12);
      } else {
        targetScrollTop = Math.max(0, relativeTop - (containerHeight - elementHeight) / 2);
      }

      scrollContainer.scrollTo({
        top: targetScrollTop,
        behavior
      });
    }

    if (onComplete) {
      setTimeout(onComplete, behavior === 'smooth' ? 240 : 10);
    }
  };

  if (delay > 0) {
    setTimeout(execute, delay);
  } else {
    requestAnimationFrame(execute);
    setTimeout(execute, 20); // backup trigger for immediate reflows
  }
}

/**
 * Smoothly scrolls an element or CSS selector into comfortable view
 */
export function smoothScrollToElement(
  target: HTMLElement | string | null | undefined,
  options: ScrollOptions = {}
): void {
  if (typeof window === 'undefined') return;

  const {
    position = 'center',
    behavior = 'smooth',
    topOffset = 80,
    bottomOffset = 24,
    delay = 0,
    container = null,
    onComplete
  } = options;

  if (position === 'center') {
    centerElementInViewport(target, {
      topOffset,
      bottomOffset,
      delay,
      behavior,
      onComplete
    });
    return;
  }

  const performScroll = () => {
    let el: HTMLElement | null = null;
    if (typeof target === 'string') {
      el = document.querySelector<HTMLElement>(target);
    } else if (target && 'nodeType' in target) {
      el = target;
    }

    if (!el) {
      if (onComplete) onComplete();
      return;
    }

    const scrollContainer = container || getScrollParent(el);

    if (scrollContainer === window || scrollContainer === document.body || scrollContainer === document.documentElement) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const absoluteTop = rect.top + currentScrollY;

      let targetScrollY = 0;

      if (position === 'top') {
        targetScrollY = Math.max(0, absoluteTop - topOffset);
      } else {
        // auto
        if (rect.height > (windowHeight - topOffset - bottomOffset)) {
          targetScrollY = Math.max(0, absoluteTop - topOffset);
        } else {
          const middle = absoluteTop - (windowHeight / 2) + (rect.height / 2);
          targetScrollY = Math.max(0, middle);
        }
      }

      window.scrollTo({
        top: targetScrollY,
        behavior
      });
    } else if (scrollContainer instanceof HTMLElement) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + scrollContainer.scrollTop;

      let targetScrollTop = 0;

      if (position === 'top') {
        targetScrollTop = Math.max(0, relativeTop - 16);
      } else {
        targetScrollTop = Math.max(0, relativeTop - (scrollContainer.clientHeight / 2) + (elRect.height / 2));
      }

      scrollContainer.scrollTo({
        top: targetScrollTop,
        behavior
      });
    }

    if (onComplete) {
      setTimeout(onComplete, behavior === 'smooth' ? 260 : 10);
    }
  };

  if (delay > 0) {
    setTimeout(performScroll, delay);
  } else {
    requestAnimationFrame(performScroll);
  }
}

export { useScrollIntoView } from '../hooks/useScrollIntoView';

