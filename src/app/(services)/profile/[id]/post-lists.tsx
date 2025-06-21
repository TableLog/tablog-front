import React from 'react';

import Tab from '@/components/atoms/tab/Tab';

import RecipeListByUser from './recipe-list-by-user';

const PostLists = () => {
  return (
    <div>
      <Tab>
        <Tab.Buttons tabs={['레시피', '일기']} />

        <Tab.Panel index={0}>
          <RecipeListByUser />
        </Tab.Panel>

        <Tab.Panel index={1}>일기 목록</Tab.Panel>
      </Tab>
    </div>
  );
};

export default PostLists;
