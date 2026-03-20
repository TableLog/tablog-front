import CategoryTab from '@/components/atoms/category-tab/CategoryTab';
import RecipeCategory from '@/components/atoms/recipe-category/RecipeCategory';
import Tab from '@/components/atoms/tab/Tab';
import { COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { useFilterStore } from '@/lib/zustand/recipeStore';

import FilterRecipes from './filter-recipes';
import FilterRecipesFood from './filter-recipes-food';
import LatestRecipes from './latest-recipes';
import PopularRecipes from './popular-recipes';

function HomeTabs() {
  const { filterCondition } = useFilterStore();

  return (
    <div>
      <Tab>
        <div className="px-5">
          {/* 칼로리 */}
          {/* <Tab.Buttons tabs={['카테고리', '요리시간', '칼로리', '가격', '재료']} className="mb-4" /> */}
          <Tab.Buttons tabs={['카테고리', '요리시간', '가격', '재료']} className="mb-4" />
        </div>

        <Tab.Panel index={0}>
          <RecipeCategory />

          {filterCondition?.recipeCategory ? (
            <FilterRecipes type="recipeCategory" />
          ) : (
            <>
              <LatestRecipes />

              <PopularRecipes />
            </>
          )}
        </Tab.Panel>

        <Tab.Panel index={1}>
          <CategoryTab list={COOK_TIME_OPTIONS} type="cookingTime" />
          <FilterRecipes type="cookingTime" />
        </Tab.Panel>

        {/* 칼로리 */}
        {/* <Tab.Panel index={2}>
          <CategoryTab list={CALORIE_OPTIONS} type="calorieRange" />
          <FilterRecipes type="calorieRange" />
        </Tab.Panel> */}

        <Tab.Panel index={2}>
          <CategoryTab list={PRICE_OPTIONS} type="recipePrice" />
          <FilterRecipes type="recipePrice" />
        </Tab.Panel>

        <Tab.Panel index={3}>
          <FilterRecipesFood />
        </Tab.Panel>
      </Tab>
    </div>
  );
}

export default HomeTabs;
