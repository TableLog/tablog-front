'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddLog } from '@/hooks/feed.hooks';
import { zodAddLog } from '@/lib/zod/zodValidation';
import { TAddLogFormData } from '@/types/api';
import { showToast } from '@/utils/functions';

export interface IImageList {
  id: string;
  src: string;
  file?: File;
  input?: boolean;
}

const LogForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [imageList, setImageList] = useState<IImageList[]>([]);
  const [imageRequired, setImageRequired] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddLogFormData>({
    resolver: zodResolver(zodAddLog),
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const { mutate: addLog } = useAddLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push('/feed');
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
        showToast({ message: '일기 작성 완료!', type: 'success' });
      }
    },
  });

  const onSubmit: SubmitHandler<TAddLogFormData> = async (data) => {
    if (imageList?.length < 1) {
      setImageRequired(true);

      return;
    }

    const formdata = new FormData();

    formdata.append('category', '게시판');

    formdata.append(
      'controllerRequestDto',
      JSON.stringify({
        ...data,
      }),
    );

    imageList.forEach((image) => {
      if (image.file) {
        formdata.append('multipartFiles', image.file);
      }
    });

    addLog(formdata);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <RecipeImageInput
          half
          imageList={imageList}
          setImageList={setImageList}
          error={imageRequired}
        />

        <TextArea category="content" register={register} errors={errors} maxLength={500} />
      </div>

      <div className="mt-24">
        <Button full type="submit">
          작성하기
        </Button>
      </div>
    </form>
  );
};

export default LogForm;
