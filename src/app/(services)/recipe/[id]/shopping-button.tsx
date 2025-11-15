import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { RECIPE_INGREDIENT_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddShoppingList, useRemoveShoppingList } from '@/hooks/queries/shopping.hooks';
import { AddShoppingListPayload } from '@/types/api';

interface ShoppingButtonProps {
  foodId: number;
  amount: number;
  foodUnit: string;
  isChecked: boolean;
}

function ShoppingButton({ foodId, amount, foodUnit, isChecked }: ShoppingButtonProps) {
  const queryClient = useQueryClient();
  const shoppingListId = useRef<number>(-1);

  const { mutate: addShoppingList } = useAddShoppingList({
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [RECIPE_INGREDIENT_QUERY_KEY],
      });
      console.log(res);
      shoppingListId.current = res.data.id;
    },
  });
  const { mutate: removeShoppingList } = useRemoveShoppingList({});

  function handleCartButtonClick(data: AddShoppingListPayload, isChecked: boolean) {
    if (isChecked) removeShoppingList({ shoppingListId: shoppingListId.current });
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
