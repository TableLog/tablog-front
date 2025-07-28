'use client';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';

import Button from '@/components/atoms/button/Button';
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8">
          {stepFields.map(({ id }, idx) => (
            <div key={id} className="flex flex-col gap-1.5">
              <div className="flex w-full items-center justify-between">
                <button
                  type="button"
                  className="flex gap-2"
                  onClick={() => handleStepButtonClick(idx)}
                >
                  <span className="w-[50px] font-medium text-grey01">단계 {idx + 1}</span>
                  <Image
                    width={20}
                    height={20}
                    src="/icons/arrow.svg"
                    alt="토글 아이콘"
                    className={cn('duration-150', idx === activeStep && '-rotate-180')}
                  />
                </button>
                <button type="button" onClick={() => handleDeleteStep(idx)}>
                  <Image width={24} height={24} src="/icons/delete.svg" alt="삭제 아이콘" />
                </button>
              </div>
              <div className={cn('w-full', idx !== activeStep && 'hidden')}>
                <div className="mb-8">
                  <RecipeImageInput
                    maxImage={3}
                    label="이미지 업로드"
                    control={control}
                    name={`dtos.${idx}.files`}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`dtos.${idx}.files`}
                    render={({ message }) => (
                      <div className="validator-hint mt-0 whitespace-pre-line text-sm font-normal leading-[1.5] text-red01">
                        {message}
                      </div>
                    )}
                  />
                </div>
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
        </div>
      </div>

      <Button size="large" full onClick={handleAddStep}>
        + 순서 추가
      </Button>
    </div>
  );
};

export default RecipeForm;
