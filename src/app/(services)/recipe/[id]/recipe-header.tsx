'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import ToggleModeButton from '@/components/atoms/button/ToggleModeButton';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import TextArea from '@/components/atoms/input/TextArea';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import Popup from '@/components/molecules/popup/Popup';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { ERecipeDetailSection } from '@/constants/common.constants';
import { DELETE_RECIPE_MODAL } from '@/constants/modal.constants';
import { RECIPE_MY_OPTIONS, RECIPE_OPTIONS } from '@/constants/options.constants';
import { RECIPE_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteRecipe } from '@/hooks/recipe.hooks';
import { useReport } from '@/hooks/report.hooks';
import { zodReportForm } from '@/lib/zod/zodValidation';
import { ERecipeOption, EReportType } from '@/types/enum';
import { HandleOpenModal, showToast } from '@/utils/functions';

interface RecipeHeaderProps {
  recipeId: number;
  authorId?: number;
  isMyRecipe?: boolean;
}

const RecipeHeader = ({ recipeId, authorId, isMyRecipe = false }: RecipeHeaderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  type TReportFormValues = z.infer<typeof zodReportForm>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReportFormValues>({
    resolver: zodResolver(zodReportForm),
    mode: 'onChange',
  });

  const { mutate: deleteRecipe } = useDeleteRecipe({
    onSuccess: () => {
      router.push('/recipe');
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY });
      showToast({ message: '레시피 삭제 완료!', type: 'success' });
    },
  });

  const { mutate: reportRecipe } = useReport({
    onSuccess: () => {
      router.push('/recipe');
      showToast({ message: '레시피 신고 완료!', type: 'success' });
    },
  });

  function onSubmit(data: TReportFormValues) {
    if (!authorId) return;
    reportRecipe({
      reportedUserId: authorId,
      reportType: EReportType.RECIPE,
      targetId: recipeId,
      ...data,
    });
  }

  function handleOptionClick(type: string) {
    switch (type) {
      case ERecipeOption.PROFILE:
        router.push(`/profile/${authorId}`);
        break;
      case ERecipeOption.CHAT:
        // ! 채팅하기
        break;
      case ERecipeOption.REPORT:
        setBottomSheetOpen(true);
        break;
      case ERecipeOption.EDIT:
        // ! 수정하기
        break;
      case ERecipeOption.DELETE:
        HandleOpenModal(DELETE_RECIPE_MODAL);
        break;
    }
  }

  return (
    <>
      <div className="sticky z-50 flex items-center justify-between px-5 py-4">
        <Link href="/recipe">
          <BoxIcon name="arrow-back" size={24} color="white" />
        </Link>
        <div className="text-white01 absolute left-1/2 -translate-x-1/2">
          <ToggleModeButton
            options={[ERecipeDetailSection.INGREDIENT, ERecipeDetailSection.DESCRIPTION]}
            onChange={(newOption: string) => {
              params.set('mode', newOption);
              router.replace(`${pathname}?${params.toString()}`);
            }}
          />
        </div>

        <MoreOptions
          options={isMyRecipe ? RECIPE_MY_OPTIONS : RECIPE_OPTIONS}
          buttonEvent={handleOptionClick}
          iconColor="white"
        />

        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setBottomSheetOpen(false)}
          title="신고하기"
          buttons={
            <div className="grid grid-cols-2 gap-1.5">
              <Button buttonColor="grey06" onClick={() => setBottomSheetOpen(false)}>
                닫기
              </Button>
              <Button full type="submit" form="report-form">
                제출
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="px-5" id="report-form">
            <TextArea
              register={register}
              category="reportContent"
              errors={errors}
              maxLength={300}
            />
          </form>
        </BottomSheet>
      </div>

      <Popup
        id={DELETE_RECIPE_MODAL}
        title="레시피를 삭제하시겠습니까?"
        closeButtonName="취소"
        activeButtonComponent={
          <Button buttonColor="primary" size="medium" onClick={() => deleteRecipe({ recipeId })}>
            삭제
          </Button>
        }
      >
        <p>레시피를 삭제하시면 되돌리실 수 없습니다.</p>
      </Popup>
    </>
  );
};

export default RecipeHeader;
