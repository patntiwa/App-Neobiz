import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<Element>();
  const frozen = useRef<boolean>(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setEntry(entry);

    if (entry.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
      setIsVisible(true);
    } else if (!freezeOnceVisible) {
      setIsVisible(entry.isIntersecting);
    }
  };

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen.current) return;

    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin,
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, root, rootMargin, frozen]);

  return {
    setRef: (element: Element) => {
      elementRef.current = element;
    },
    entry,
    isVisible,
  };
};