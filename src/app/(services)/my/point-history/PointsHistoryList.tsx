import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { IPointHistory } from '@/types/api';
import { convertDateFormat } from '@/utils/functions';

interface IPointsHistoryListProps {
  type: 'EARN' | 'USE';
  pointHistory: IPointHistory[];
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
}
const PointsHistoryList = ({
  type,
  pointHistory,
  hasNextPage,
  isFetching,
  fetchNextPage,
}: IPointsHistoryListProps) => {
  return (
    <InfiniteScroll hasNextPage={hasNextPage} isFetching={isFetching} fetchNextPage={fetchNextPage}>
      {pointHistory?.length === 0 ? (
        <div className="text-center text-sm text-grey01">내역이 없습니다.</div>
      ) : (
        pointHistory.map((point) => {
          return (
            <div
              key={point.id}
              className="mb-4 flex flex-col gap-2 border-grey07 pb-4 last:border-b-0 [&:not(:last-child)]:border-b"
            >
              <div className="flex items-center justify-between text-sm">
                <div>{point.pointReason}</div>

                <div className="text-sm font-bold">
                  {type === 'EARN' ? `+ ` : `- `}
                  {point.amount.toLocaleString()}
                </div>
              </div>

              <div className="text-sm text-grey01">{convertDateFormat(point.modifiedAt)}</div>
            </div>
          );
        })
      )}
    </InfiniteScroll>
  );
};

export default PointsHistoryList;
