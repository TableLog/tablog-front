import { useQueryClient } from '@tanstack/react-query';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { RECIPE_QUERY_KEY, USER_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddShoppingList, useRemoveShoppingList } from '@/hooks/queries/shopping.hooks';
import { AddShoppingListPayload } from '@/types/api';

interface ShoppingButtonProps {
  recipeId: number;
  foodId: number;
  amount: number;
  foodUnit: string;
  isChecked: boolean;
  shoppingListId?: number;
}

function ShoppingButton({
  recipeId,
  foodId,
  amount,
  foodUnit,
  isChecked,
  shoppingListId,
}: ShoppingButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: addShoppingList } = useAddShoppingList({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECIPE_QUERY_KEY.INGREDIENT_LIST(recipeId),
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.SHOPPING_LIST(),
      });
    },
  });
  const { mutate: removeShoppingList } = useRemoveShoppingList({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECIPE_QUERY_KEY.INGREDIENT_LIST(recipeId),
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.SHOPPING_LIST(),
      });
    },
  });

  function handleCartButtonClick(data: AddShoppingListPayload, isChecked: boolean) {
    if (isChecked && shoppingListId) removeShoppingList({ shoppingListId });
    else addShoppingList(data);
  }

  return (
    <button
      type="button"
      onClick={() =>
        handleCartButtonClick(
          {
            foodId,
            amount,
            foodUnit,
          },
          isChecked,
        )
      }
    >
      <BoxIcon type={isChecked ? 'solid' : 'regular'} name="cart" size={24} />
    </button>
  );
}

export default ShoppingButton;
