import React from 'react';

import Tab from '@/components/atoms/tab/Tab';

import FeedListByUser from './feed-list-by-user';
import RecipeListByUser from './recipe-list-by-user';

const PostLists = () => {
  return (
    <div>
      <Tab>
        <div className="px-5">
          <Tab.Buttons tabs={['레시피', '일기']} />
        </div>

        <Tab.Panel index={0}>
          <RecipeListByUser />
        </Tab.Panel>

        <Tab.Panel index={1}>
          <FeedListByUser />
        </Tab.Panel>
      </Tab>
    </div>
  );
};

export default PostLists;
