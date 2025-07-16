import { useEffect, useRef } from 'react';

interface TouchHandlers {
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
}

export function useCarouselTouch(
  elementRef: React.RefObject<HTMLElement>,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold = 50
) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
      isSwiping.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      touchEndX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
      if (!isSwiping.current) return;
      
      const swipeDistance = touchStartX.current - touchEndX.current;
      const absDistance = Math.abs(swipeDistance);

      if (absDistance > threshold) {
        if (swipeDistance > 0 && onSwipeLeft) {
          // Swiped left - go to next
          onSwipeLeft();
        } else if (swipeDistance < 0 && onSwipeRight) {
          // Swiped right - go to previous
          onSwipeRight();
        }
      }

      isSwiping.current = false;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, onSwipeLeft, onSwipeRight, threshold]);
}