import { useCallback, useEffect } from 'react';

interface ScrollPositionProps {
  storageKey: string;
  scrollElementSelector?: string;
  shouldRestore?: boolean;
  behavior?: ScrollBehavior;
}

export const useScrollPosition = ({
  storageKey,
  scrollElementSelector = '.scrollable-content',
  shouldRestore = true,
  behavior = 'auto',
}: ScrollPositionProps) => {
  const saveScrollPosition = useCallback(() => {
    try {
      const element = document.querySelector(scrollElementSelector) as HTMLElement;

      if (!element) return;

      sessionStorage.setItem(storageKey, element.scrollTop.toString());
    } catch (error) {
      console.debug('Failed to save scroll position', error);
    }
  }, [storageKey, scrollElementSelector]);

  const restoreScrollPosition = useCallback(() => {
    if (!shouldRestore) return;

    try {
      const savedPosition = sessionStorage.getItem(storageKey);
      if (!savedPosition) return;

      requestAnimationFrame(() => {
        const element = document.querySelector(scrollElementSelector) as HTMLElement;
        if (!element) return;

        element.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior,
        });

        sessionStorage.removeItem(storageKey);
      });
    } catch (error) {
      console.debug('Failed to save restore position', error);
    }
  }, [storageKey, scrollElementSelector, shouldRestore, behavior]);

  // 페이지 이동시 스크롤 위치 저장
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const linkElement = (e.target as HTMLElement).closest('a');

      if (linkElement?.getAttribute('href')?.startsWith('/')) {
        saveScrollPosition();
      }
    };

    window.addEventListener('popstate', saveScrollPosition);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', saveScrollPosition);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [saveScrollPosition]);

  // 스크롤 위치 복원
  useEffect(() => restoreScrollPosition(), [restoreScrollPosition]);

  return null;
};
