import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import TextArea from '@/components/atoms/input/TextArea';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { RECIPE_MEMO_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddRecipeMemo, useGetRecipeMemo, useUpdateRecipeMemo } from '@/hooks/recipe.hooks';
import { zodMemoForm } from '@/lib/zod/zodValidation';
import { showToast } from '@/utils/functions';

interface MemoButtonProps {
  recipeId: number;
}
const MemoButton = ({ recipeId }: MemoButtonProps) => {
  const queryClient = useQueryClient();
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const { data: recipeMemo, isPending, isError, error } = useGetRecipeMemo({ recipeId });
  const { mutate: addMemo } = useAddRecipeMemo({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_MEMO_QUERY_KEY(recipeId) });
      setBottomSheetOpen(false);
    },
    onError: () => showToast({ message: '레시피 메모 등록 중 오류가 발생했어요', type: 'error' }),
  });
  const { mutate: updateMemo } = useUpdateRecipeMemo({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_MEMO_QUERY_KEY(recipeId) });
      setBottomSheetOpen(false);
    },
    onError: () => showToast({ message: '레시피 메모 수정 중 오류가 발생했어요', type: 'error' }),
  });

  type TMemoFormValues = z.infer<typeof zodMemoForm>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMemoFormValues>({
    resolver: zodResolver(zodMemoForm),
    mode: 'onChange',
    defaultValues: {
      memo: recipeMemo?.data.memo,
    },
  });

  const isMemoEmpty = isAxiosError(error) && error.status === 404;

  if (isPending || (isError && !isMemoEmpty)) return <></>;

  function handleButtonClick() {
    setBottomSheetOpen(true);
  }

  function onSubmit(data: TMemoFormValues) {
    const isMemoUpdated = recipeMemo?.data.memo !== data.memo;
    if (!isMemoUpdated) return setBottomSheetOpen(false);
    if (isMemoEmpty) addMemo({ recipeId, ...data });
    else updateMemo({ recipeId, ...data });
  }

  return (
    <>
      <button className="flex items-center" onClick={handleButtonClick}>
        <BoxIcon name="note" size={24} type={isMemoEmpty ? 'regular' : 'solid'} />
      </button>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title="메모"
        buttons={
          <div className="grid grid-cols-2 gap-1.5">
            <Button buttonColor="grey06" onClick={() => setBottomSheetOpen(false)}>
              닫기
            </Button>
            <Button full type="submit" form="memo-form">
              저장
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="px-5" id="memo-form">
          <TextArea
            register={register}
            category="memo"
            errors={errors}
            maxLength={300}
            defaultValue={isMemoEmpty ? '' : recipeMemo?.data.memo}
          />
        </form>
      </BottomSheet>
    </>
  );
};

export default MemoButton;
