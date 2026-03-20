import { Text } from '@/components/atoms/text/Text';
import { UNREGISTER_MODAL } from '@/constants/modal.constants';
import { useLogout } from '@/hooks/queries/auth.hooks';
import { handleOpenModal } from '@/utils/functions';

const LogoutSignout = () => {
  const { mutate: logout } = useLogout();

  const buttonList = [
    { id: 1, title: '로그아웃', onClick: () => logout() },
    {
      id: 2,
      title: '회원 탈퇴',
      onClick: () => {
        handleOpenModal(UNREGISTER_MODAL);
      },
    },
  ];

  return (
    <section>
      <div className="divider">
        <Text fontSize={12} color="grey02">
          로그아웃 및 탈퇴
        </Text>
      </div>

      <div className="flex flex-col">
        {buttonList.map((menu) => {
          return (
            <Text
              key={menu.id}
              className="py-2"
              onClick={menu.onClick}
              color={menu.title === '로그아웃' ? 'grey04' : 'red01'}
            >
              {menu.title}
            </Text>
          );
        })}
      </div>
    </section>
  );
};

export default LogoutSignout;
