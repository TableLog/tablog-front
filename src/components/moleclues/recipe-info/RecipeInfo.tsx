interface RecipeInfoProps {
  recipeName: string;
  price: number;
  time: number;
  calorie: number;
  star: number;
  comments: number;
  author: string;
}

const RecipeInfo = ({
  recipeName,
  price,
  time,
  calorie,
  star,
  comments,
  author,
}: RecipeInfoProps) => {
  return (
    <div>
      <p>{recipeName}</p>
      <p>
        {price} | {time} | {calorie}
      </p>
      <p>
        {star}({comments}) | {author}
      </p>
    </div>
  );
};

export default RecipeInfo;
