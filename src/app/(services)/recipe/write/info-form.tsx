'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ToggleButton from '@/components/atoms/button/ToggleButton';
import CategoryTag from '@/components/atoms/category-tag/CategoryTag';
import Range from '@/components/atoms/input/Range';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import Tooltip from '@/components/atoms/tooltip/Tooltip';
import { zodRecipeInfo } from '@/lib/zod/zodValidation';

interface TRecipeInfoValues {
  recipeName: string;
}

const InfoForm = ({ id }: { id: string }) => {
  const [toggleValue, setToggleValue] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<TRecipeInfoValues>({
    resolver: zodResolver(zodRecipeInfo),
    mode: 'onChange',
    defaultValues: {
      recipeName: '',
    },
  });

  return (
    <div id={id} className="flex flex-col gap-8">
      <div>
        <RecipeImageInput
          className="mb-4"
          max={1}
          width={375}
          height={256}
          label="썸네일 이미지 업로드"
        />
        <TextInput category="recipeName" register={register} errors={errors} />
        <TextArea category="recipeDescription" />
        {/* register={register} errors={errors} 가 없음 */}
      </div>

      <CategoryTag />

      <Range type="price" />

      <Range type="time" />

      <ToggleButton
        title={
          <div className="flex items-center gap-2">
            <span>유료 레시피로 등록</span>
            <Tooltip>
              <p>
                등록된 레시피가 50개 이상이거나 사업장 등록증 또는 레시피 특허증을 등록하면 레시피를
                유로로 등록하실 수 있습니다.
              </p>
              <p>유료로 등록한 레시피의 재료 및 요리 과정은 유료 결제한 회원들에게만 노출됩니다.</p>
            </Tooltip>
          </div>
        }
        value={toggleValue}
        setValue={setToggleValue}
      />
    </div>
  );
};

export default InfoForm;
