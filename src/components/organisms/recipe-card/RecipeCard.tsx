import RecipeInfo from '@/components/molecules/recipe-info/RecipeInfo';
import { cn } from '@/utils/cn';

interface IRecipeCardProps {
  recipeName: string;
  price: number;
  time: number;
  calorie: number;
  star: number;
  comments: number;
  author: string;
  marked: boolean;
  recipeImg?: string;
  latest?: boolean;
}

const RecipeCard = ({ recipe }: { recipe: IRecipeCardProps }) => {
  //동적 스타일링
  let bgImg = '';

  if (recipe.recipeImg) {
    bgImg = `url(${recipe.recipeImg})`;
  } else {
    bgImg = 'bg-grey04';
  }

  return (
    <div
      style={{ backgroundImage: recipe.recipeImg && bgImg }}
      className={cn(
        recipe.recipeImg || bgImg,
        'relative flex h-[256px] w-[335px] flex-col rounded-[20px] bg-cover',
      )}
    >
      <div className="flex-1/2"></div>

      <div
        className={cn(
          'box-border flex-1/2 rounded-b-[20px] px-[16px] py-[10px] backdrop-blur-sm',
          recipe.latest && 'm-[10px] rounded-[20px]',
        )}
      >
        <RecipeInfo
          recipeName={recipe.recipeName}
          price={recipe.price}
          time={recipe.time}
          calorie={recipe.calorie}
          star={recipe.star}
          comments={recipe.comments}
          author={recipe.author}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
