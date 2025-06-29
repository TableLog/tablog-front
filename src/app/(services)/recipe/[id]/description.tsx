import Link from 'next/link';

import RecipeBookmarkButton from '@/components/atoms/button/RecipeBookmarkButton';
import RecipeLikeButton from '@/components/atoms/button/RecipeLikeButton';
import ShareButton from '@/components/atoms/button/ShareButton';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { IRecipeDetailResponse } from '@/types/api';
import { ECookTime, EPrice, EUserRole } from '@/types/enum';

interface DescriptionProps {
  recipe: IRecipeDetailResponse;
}

const Description = ({ recipe }: DescriptionProps) => {
  const { data: userInfo } = useGetUserInfo();

  if (!recipe) return null;

  return (
    <div className="bg-white01/20 text-white01 flex flex-col items-center gap-4 rounded-[20px] px-4 py-6 backdrop-blur-2xl">
      <div className="flex items-center gap-1">
        {recipe.isPaid && <BoxIcon name="dollar-circle" size={20} color="yellow01" type="solid" />}
        <p className="text-lg font-medium">{recipe?.title}</p>
      </div>
      <p className="flex items-center gap-0.5 text-sm">
        <div className="flex items-center">
          <BoxIcon color="primary01" name="star" type="solid" size={16} /> {recipe?.star}
          <Link href={`/recipe/${recipe.id}/review`} className="underline">
            ({recipe?.reviewCount})
          </Link>
        </div>
        <span>|</span>
        <div className="flex items-center gap-0.5">
          <span>{recipe?.user}</span>
          {userInfo?.userRole === EUserRole.EXPERT && (
            <BoxIcon color="white01" name="badge-check" size={16} type="solid" />
          )}
        </div>
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
          <ShareButton
            shareInfo={{
              title: `[식탁일기] ${recipe.title}`,
              text: recipe.intro,
              url: `/recipe/${recipe.id}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
