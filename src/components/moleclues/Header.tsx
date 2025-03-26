import Icon from '../atoms/icon/Icon';
import Title from '../atoms/title/Title';

const Header = () => {
  const onClickSearch = () => {
    console.log('search');
  };

  const onClickNotification = () => {
    console.log('notification');
  };

  return (
    <div className="bg-primary01 flex w-[375px] justify-between px-[20px] pt-[23.5px] pb-[12.5px]">
      <Title />
      <div className="flex gap-[10px]">
        <Icon iconName="bx bx-search-alt" className="text-white01" onClick={onClickSearch} />
        <Icon iconName="bx bx-bell" className="text-white01" onClick={onClickNotification} />
      </div>
    </div>
  );
};

export default Header;
