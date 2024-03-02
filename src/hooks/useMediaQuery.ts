import { useEffect, useState } from 'react';

// 媒体查询 命中响应式断点
const useMediaQuery = (breakpoints: any[]) => {
  const [matches, setMatches] = useState<boolean[]>([]);

  useEffect(() => {
    const mediaQueries = breakpoints?.map?.((breakpoint) =>
      window.matchMedia(`(min-width: ${breakpoint}px)`),
    );

    setMatches(mediaQueries?.map((mq) => mq?.matches));

    const handlers = mediaQueries?.map((mq, index) => {
      const handler = (event) => {
        setMatches((prev) => {
          const next = [...prev] ?? [];

          next[index] = event.matches;

          return next;
        });
      };

      mq?.addEventListener('change', handler);

      return handler;
    });

    return () => {
      mediaQueries?.forEach((mq, index) => {
        mq?.removeEventListener('change', handlers[index]);
      });
    };
  }, []);

  return matches;
};

export default useMediaQuery;
