import Link from 'next/link';

import RecipeBookmarkButton from '@/components/atoms/button/RecipeBookmarkButton';
import RecipeLikeButton from '@/components/atoms/button/RecipeLikeButton';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { ECookTime, EPrice } from '@/constants/options.constants';
import { IRecipeDetailResponse } from '@/types/api';

interface DescriptionProps {
  recipe: IRecipeDetailResponse;
}

const Description = ({ recipe }: DescriptionProps) => {
  if (!recipe) return null;

  return (
    <div className="bg-white01/20 text-white01 flex flex-col items-center gap-4 rounded-[20px] px-4 py-6 backdrop-blur-2xl">
      <p className="text-lg font-medium">{recipe?.title}</p>
      <p className="flex items-center text-sm">
        <BoxIcon color="primary01" name="bx bxs-star" size={16} /> {recipe?.star}(
        <Link href={`/recipe/${recipe.id}/review`} className="underline">
          {recipe?.reviewCount}
        </Link>
        ) | {recipe?.user}
      </p>
      <p>{recipe?.intro}</p>
      <p className="text-sm">
        {EPrice[recipe.price]}원 | {ECookTime[recipe.cookingTime]} | {recipe.totalCal}kcal
      </p>
      <div className="flex flex-wrap gap-1.5">
        {recipe.recipeCategoryList.map((category, idx) => (
          <span
            key={`category-${idx}`}
            className="bg-white01/80 text-black01 rounded-full px-2.5 py-1 text-sm"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-5">
          <RecipeLikeButton recipeId={recipe.id} likeCount={recipe.likeCount} />
          <RecipeBookmarkButton recipeId={recipe.id} />
        </div>
        <div className="flex items-center gap-5">
          <button className="flex items-center">
            <BoxIcon name="bxr bx-send" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
