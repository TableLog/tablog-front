import Tabs from '@/components/atoms/tabs/Tabs';

import InfoForm from './info-form';
import IngredientForm from './ingredient-form';
import RecipeForm from './recipe-form';

const RecipeWritePage = () => {
  const tabs = [
    { id: 'info', label: '레시피 정보' },
    { id: 'ingredients', label: '재료 등록' },
    { id: 'recipe', label: '조리 방법' },
  ];

  return (
    <div className="mb-4">
      <Tabs tabs={tabs}>
        <InfoForm id={tabs[0].id} />
        <IngredientForm id={tabs[1].id} />
        <RecipeForm id={tabs[2].id} />
      </Tabs>
    </div>
  );
};

export default RecipeWritePage;
