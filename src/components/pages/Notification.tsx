import { BoxIcon } from '../atoms/icon/BoxIcon';
import { Text } from '../atoms/text/Text';
import Content from '../templates/content/Content';

interface NotificationProps {
  handleCloseNotification: () => void;
}

export default function Notification({ handleCloseNotification }: NotificationProps) {
  const notifications = [
    {
      id: 'noti-0',
      content: '작성하신 레시피에 새로운 댓글이 등록되었습니다.',
      date: '2025.02.23',
    },
    {
      id: 'noti-1',
      content:
        '작성하신 레시피에 새로운 댓글이 등록되었습니다.작성하신 레시피에 새로운 댓글이 등록되었습니다.',
      date: '2025.02.23',
    },
    {
      id: 'noti-2',
      content:
        '작성하신 레시피에 새로운 댓글이 등록되었습니다.작성하신 레시피에 새로운 댓글이 등록되었습니다.작성하신 레시피에 새로운 댓글이 등록되었습니다.작성하신 레시피에 새로운 댓글이 등록되었습니다.',
      date: '2025.02.23',
    },
  ];

  const deleteNoti = (id: string) => {
    alert('삭제! ' + id);
  };

  return (
    <Content>
      <div className="mb-4 flex gap-5 px-1">
        <div className="flex h-[34px] flex-grow items-center gap-3">
          <Text fontWeight="semiBold">내게 온 알림</Text>
          <button className="rounded-full border border-grey05 px-3 py-1">
            <Text fontSize={12} color="grey02">
              전체 삭제
            </Text>
          </button>
        </div>
        <button type="button" onClick={handleCloseNotification}>
          <Text fontWeight="medium" color="grey03" fontSize={14}>
            닫기
          </Text>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {notifications.map((noti) => (
          <div key={noti.id} className="flex items-start rounded-md px-2.5 py-2.5 hover:bg-grey08">
            <div className="flex flex-grow flex-col gap-2">
              <Text className="flex-grow" fontSize={14}>
                {noti.content}
              </Text>
              <Text fontSize={12} color="grey01">
                {noti.date}
              </Text>
            </div>
            <button onClick={() => deleteNoti(noti.id)}>
              <BoxIcon name="x" size={24} color="grey05" />
            </button>
          </div>
        ))}
      </div>
    </Content>
  );
}
