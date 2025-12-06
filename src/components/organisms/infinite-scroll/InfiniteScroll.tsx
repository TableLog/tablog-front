import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';

interface InfiniteScrollProps extends PropsWithChildren {
  className?: string;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  loader?: ReactNode;
}

function InfiniteScroll({
  className,
  hasNextPage,
  isFetching,
  fetchNextPage,
  loader = (
    <div className="flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  children,
}: InfiniteScrollProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className={className}>
      {children}
      {isFetching && loader}
      <div ref={ref as React.RefCallback<HTMLDivElement>} />
    </div>
  );
}

export default InfiniteScroll;
