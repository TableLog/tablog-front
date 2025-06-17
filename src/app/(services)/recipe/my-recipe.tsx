interface MyRecipeProps {
  isOnlyPaid: boolean;
  selectedSortOption: { id: number; title: string; name: string };
}

const MyRecipe = ({ isOnlyPaid, selectedSortOption }: MyRecipeProps) => {
  //   const { data: recipes } = useGetSortedRecipe(
  //     {
  //       isPaid: isOnlyPaid,
  //       pageNumber: 0,
  //     },
  //     { sortOption: selectedSortOption.name },
  //   );
  //   const recipeContents = recipes?.data?.contents;
  //   return <RecipeList recipes={recipeContents} />;
  return (
    <>
      {isOnlyPaid} {selectedSortOption.title}
    </>
  );
};

export default MyRecipe;
