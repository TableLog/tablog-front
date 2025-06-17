import Image from 'next/image';
import Link from 'next/link';

import RecipeInfo from '@/components/molecules/recipe-info/RecipeInfo';
import { ECookTime, EPrice } from '@/constants/options.constants';
import { IRecipeList } from '@/types/api';

interface RecipeListProps {
  recipe: IRecipeList;
}
const RecipeItem = ({ recipe }: RecipeListProps) => {
  return (
    <Link
      key={recipe.id}
      href={`/recipe/${recipe.id}`}
      className="relative aspect-[16/12] w-full overflow-hidden rounded-[20px]"
    >
      <Image src={recipe.imageUrl} alt={`${recipe.title} 이미지`} fill className="object-cover" />
      <div className="absolute bottom-0 w-full">
        <RecipeInfo
          recipeName={recipe.title}
          price={EPrice[recipe.price]}
          time={ECookTime[recipe.cookingTime]}
          calorie={recipe.totalCal}
          star={recipe.star}
          comments={recipe.starCount}
          author={recipe.user}
        />
      </div>
    </Link>
  );
};

export default RecipeItem;
