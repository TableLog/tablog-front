'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import Button from '@/components/atoms/button/Button';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import { zodIngredientInfo } from '@/lib/zod/zodValidation';
import { cn } from '@/utils/cn';

interface TSteps {
  images: string[];
  title: string;
  description: string;
}

interface IImageList {
  id: string;
  src: string;
  file?: File;
  input?: boolean;
}

const RecipeForm = ({ id }: { id: string }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [steps, setSteps] = useState<{ id: string }[]>([{ id: '-' }]);
  const [imageList, setImageList] = useState<IImageList[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Omit<TSteps, 'images'>>({
    resolver: zodResolver(zodIngredientInfo),
    mode: 'onChange',
    defaultValues: {
      title: 'asdf',
      description: '',
    },
  });

  function handleStepButtonClick(stepIndex: number) {
    const isActiveStep = stepIndex === activeStep;
    setActiveStep(isActiveStep ? -1 : stepIndex);
  }

  function addStep(step: Omit<TSteps, 'images'>) {
    console.log('??');
    setSteps((prev) => [...prev, { id: crypto.randomUUID() }]);
    setActiveStep(steps.length);
    console.log(step, steps);
  }

  function deleteStep(stepId: string) {
    setSteps((prev) => prev.filter((step) => step.id !== stepId));
  }

  return (
    <div id={id} className="flex flex-col gap-8">
      <Button size="large" full onClick={handleSubmit(addStep)}>
        순서 추가 +
      </Button>

      {steps.map(({ id }, idx) => (
        <div key={id} className="flex flex-col gap-1.5">
          <div className="flex w-full items-center justify-between">
            <button type="button" className="flex gap-2.5" onClick={() => handleStepButtonClick(0)}>
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
              <button type="button" onClick={() => deleteStep(id)}>
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
                max={3}
                label="이미지 업로드"
              />
              <TextInput category="stepTitle" register={register} errors={errors} />
              <TextArea
                category="stepDescription"
                register={register}
                errors={errors}
                maxLength={500}
              />
            </div>
          )}
        </div>
      ))}

      <Button size="large" full>
        레시피 등록
      </Button>
    </div>
  );
};

export default RecipeForm;
