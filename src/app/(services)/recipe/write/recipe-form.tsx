'use client';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Image from 'next/image';

import Button from '@/components/atoms/button/Button';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import { cn } from '@/utils/cn';

import { TRecipeFormValues } from './page';

interface IImageList {
  id: string;
  src: string;
  file?: File;
  input?: boolean;
}

interface RecipeFormProps {
  id: string;
}

const RecipeForm = ({ id }: RecipeFormProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [imageList, setImageList] = useState<IImageList[]>([]);

  useEffect(() => {
    handleAddStep();
  }, []);

  const {
    register,
    formState: { errors },
  } = useFormContext<TRecipeFormValues>();

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray<TRecipeFormValues, 'rpDtos.dtos'>({
    name: 'rpDtos.dtos',
  });

  function handleStepButtonClick(stepIdx: number) {
    const isActiveStep = stepIdx === activeStep;
    setActiveStep(isActiveStep ? -1 : stepIdx);
  }

  function handleAddStep() {
    appendStep({ rpTitle: '', description: '', files: undefined });
    setActiveStep(stepFields.length);
  }

  function handleDeleteStep(stepIdx: number) {
    if (stepFields.length > 1) removeStep(stepIdx);
    setActiveStep(stepFields.length - 2);
  }

  return (
    <div id={id} className="flex flex-col gap-8">
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
                className={cn('duration-150', idx !== activeStep && '-rotate-180')}
              />
            </button>
            {idx === activeStep && (
              <button type="button" onClick={() => handleDeleteStep(idx)}>
                <Image width={24} height={24} src="/icons/delete.svg" alt="삭제 아이콘" />
              </button>
            )}
          </div>

          {idx === activeStep && (
            <div className="w-full">
              <RecipeImageInput
                className="mb-8"
                imageList={imageList}
                setImageList={setImageList}
                maxImage={3}
                label="이미지 업로드"
                {...register(`rpDtos.dtos.${idx}.files`)}
              />
              <TextInput
                category="stepTitle"
                name={`rpDtos.dtos.${idx}.rpTitle`}
                register={register}
                errors={errors}
              />
              <TextArea
                category="stepDescription"
                name={`rpDtos.dtos.${idx}.description`}
                register={register}
                errors={errors}
                maxLength={500}
              />
            </div>
          )}
        </div>
      ))}

      <Button type="submit" size="large" full>
        레시피 등록
      </Button>
    </div>
  );
};

export default RecipeForm;
