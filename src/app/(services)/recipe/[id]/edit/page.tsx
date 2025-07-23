'use client';
import { use } from 'react';

import InfoForm from './info-form';

const RecipeEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);

  return (
    <div className="relative mb-4 px-5 py-4">
      <InfoForm recipeId={recipeId} />
    </div>
  );
};

export default RecipeEditPage;
