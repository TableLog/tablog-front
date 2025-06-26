import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { IRecipeList } from '@/types/api';
import { ECookTime, EPrice } from '@/types/enum';
import { cn } from '@/utils/cn';

interface RecipeInfoProps {
  recipeName: IRecipeList['title'];
  price: EPrice;
  time: ECookTime;
  calorie: IRecipeList['totalCal'];
  star: IRecipeList['star'];
  comments: IRecipeList['starCount'];
  author: IRecipeList['user'];
  latest?: boolean;
}

const RecipeInfo = ({
  recipeName,
  price,
  time,
  calorie,
  star,
  comments,
  author,
  latest = false,
}: RecipeInfoProps) => {
  return (
    <>
      <div className="flex-1/2"></div>
      <div
        className={cn(
          'bg-white01/20 box-border flex-1/2 rounded-b-[20px] px-4 py-2.5 backdrop-blur-2xl',
          latest && 'm-[10px] rounded-[20px]',
        )}
      >
        <p className="h-[52px] font-semibold">{recipeName}</p>
        <div className="flex flex-col gap-2">
          <p>
            {price}원 | {time} | {calorie}kcal
          </p>
          <p className="text-xs">
            <BoxIcon color="primary01" name="bx bxs-star" size={14} /> {star}({comments}) | {author}
          </p>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
