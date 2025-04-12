import Bookmark from '../../molecules/bookmark/Bookmark';
import RecipeInfo from '../../molecules/recipe-info/RecipeInfo';

interface RecipeCardProps {
  recipeName: string;
  price: number;
  time: number;
  calorie: number;
  star: number;
  comments: number;
  author: string;
  marked: boolean;
  recipeImg: string;
}

const RecipeCard = ({ recipe }: { recipe: RecipeCardProps }) => {
  return (
    <div
      className={`relative h-[200px] w-[335px] rounded-[20px] bg-[url(${recipe.recipeImg})] flex items-end bg-cover`}
    >
      <Bookmark isMarked={recipe.marked} />
      <div className="mx-[28px] mb-[20px] w-full backdrop-blur-sm">
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
