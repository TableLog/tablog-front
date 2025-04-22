import { cn } from '@/utils/cn';

interface RecipeInfoProps {
  recipeName: string;
  price: number;
  time: number;
  calorie: number;
  star: number;
  comments: number;
  author: string;
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
          'box-border flex-1/2 rounded-b-[20px] px-[16px] py-[10px] backdrop-blur-sm',
          latest && 'm-[10px] rounded-[20px]',
        )}
      >
        <p>{recipeName}</p>
        <p>
          {price} | {time} | {calorie}
        </p>
        <p>
          {star}({comments}) | {author}
        </p>
      </div>
    </>
  );
};

export default RecipeInfo;
