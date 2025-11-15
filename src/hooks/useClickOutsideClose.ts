import { useEffect } from 'react';

function useClickOutsideClose(ref: React.RefObject<HTMLElement | null>, closeEvent: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeEvent();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeEvent, ref]);
}

export default useClickOutsideClose;
