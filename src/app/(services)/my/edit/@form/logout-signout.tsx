import Button from '@/components/atoms/button/Button';
import { Text } from '@/components/atoms/text/Text';
import Popup from '@/components/molecules/popup/Popup';
import { UNREGISTER_MODAL } from '@/constants/modal.constants';
import { useLogout, useUnregister } from '@/hooks/queries/auth.hooks';
import { handleOpenModal } from '@/utils/functions';

const LogoutSignout = () => {
  const { mutate: logout } = useLogout();
  const { mutate: unregister } = useUnregister();

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

      <Popup
        id={UNREGISTER_MODAL}
        title="회원 탈퇴"
        activeButtonComponent={
          <Button buttonColor="primary" size="medium" onClick={() => unregister()}>
            회원 탈퇴
          </Button>
        }
      >
        <>
          <p>
            회원 탈퇴 시 같은 정보로 30일간 재가입할 수 없습니다. 이후 모든 데이터는 삭제됩니다.
          </p>

          <p>탈퇴하시겠습니까?</p>
        </>
      </Popup>

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
