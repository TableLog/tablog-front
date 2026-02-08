'use client';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import TextInfo from '@/components/atoms/input/TextInfo';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
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
                  className="flex items-center gap-2"
                  onClick={() => handleStepButtonClick(idx)}
                >
                  <Text className="w-[40px]" fontSize={14} fontWeight="medium" color="grey01">
                    단계 {idx + 1}
                  </Text>
                  <BoxIcon
                    class={cn('duration-150', idx === activeStep && '-rotate-180')}
                    name="chevron-up"
                    size={20}
                    color="grey03"
                  />
                </button>
                <button
                  className="flex items-center justify-center"
                  type="button"
                  onClick={() => handleDeleteStep(idx)}
                >
                  <BoxIcon name="x" size={20} color="grey03" />
                </button>
              </div>

              <div className={cn('w-full', idx !== activeStep && 'hidden')}>
                <div className="mb-8">
                  <RecipeImageInput
                    className="aspect-square min-h-[200px] max-w-[200px]"
                    maxImage={3}
                    label="이미지 업로드"
                    control={control}
                    name={`dtos.${idx}.files`}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`dtos.${idx}.files`}
                    render={({ message }) => <TextInfo isError>{message}</TextInfo>}
                  />
                </div>
                <div>
                  <TextInput
                    className="mb-4"
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
                    maxLength={300}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={handleAddStep}>
        <Text fontSize={14} fontWeight="medium" color="primary01">
          + 순서 추가
        </Text>
      </button>
    </div>
  );
};

export default RecipeForm;
