'use client';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Image from 'next/image';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import { cn } from '@/utils/cn';

import { TRecipeFormValues } from './page';

const RecipeForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TRecipeFormValues>();

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray<TRecipeFormValues, 'dtos'>({
    name: 'dtos',
  });

  function handleStepButtonClick(stepIdx: number) {
    const isActiveStep = stepIdx === activeStep;
    setActiveStep(isActiveStep ? -1 : stepIdx);
  }

  function handleAddStep() {
    appendStep({ rpTitle: '', description: '', files: [] });
    setActiveStep(stepFields.length);
  }

  function handleDeleteStep(stepIdx: number) {
    if (stepFields.length > 1) removeStep(stepIdx);
    setActiveStep(stepFields.length - 2);
  }

  return (
    <div className="flex flex-col gap-8">
      <Button size="large" full onClick={handleAddStep}>
        순서 추가 +
      </Button>

      {stepFields.map(({ id }, idx) => (
        <div key={id} className="flex flex-col gap-1.5">
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              className="flex gap-2.5"
              onClick={() => handleStepButtonClick(idx)}
            >
              <span className="w-[50px]">단계 {idx + 1}</span>
              <Image
                width={18}
                height={18}
                src="/icons/arrow.svg"
                alt="토글 아이콘"
                className={cn('duration-150', idx === activeStep && '-rotate-180')}
              />
            </button>
            <button
              type="button"
              className={cn(idx !== activeStep && 'hidden')}
              onClick={() => handleDeleteStep(idx)}
            >
              <BoxIcon name="x" size={24} color="grey03" />
            </button>
          </div>

          <div className={cn('w-full', idx !== activeStep && 'hidden')}>
            <RecipeImageInput
              className="mb-8"
              maxImage={3}
              label="이미지 업로드"
              control={control}
              name={`dtos.${idx}.files`}
            />
            <TextInput
              category="stepTitle"
              name={`dtos.${idx}.rpTitle`}
              register={register}
              errors={errors}
            />
            <TextArea
              category="stepDescription"
              name={`dtos.${idx}.description`}
              register={register}
              errors={errors}
              maxLength={500}
            />
          </div>
        </div>
      ))}

      <Button type="submit" size="large" full>
        레시피 등록
      </Button>
    </div>
  );
};

export default RecipeForm;
