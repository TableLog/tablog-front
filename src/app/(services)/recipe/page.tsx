import Button from '@/components/atoms/button/Button';
import Tab from '@/components/atoms/tab/Tab';

const RecipePage = () => {
  return (
    <div>
      <Tab>
        <div className="grid grid-cols-[1fr_106px] gap-4">
          <Tab.Buttons tabs={['전체 레시피', '내 레시피']} />
          <Button href="/recipe/write">레시피 등록</Button>
        </div>

        <Tab.Panel index={0}>전체 레시피 목록</Tab.Panel>
        <Tab.Panel index={1}>내 레시피 목록</Tab.Panel>
      </Tab>
    </div>
  );
};

export default RecipePage;
