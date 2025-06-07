'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import { FEED_LIST_QUERY_KEY, FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddLog, useEditLog, useGetLog } from '@/hooks/feed.hooks';
import { zodAddLog } from '@/lib/zod/zodValidation';
import { TAddLogFormData } from '@/types/api';
import { showToast } from '@/utils/functions';

export interface IImageList {
  id: string;
  src: string;
  file?: File;
  input?: boolean;
}

interface ILogFormProps {
  id?: number;
}
const LogForm = ({ id }: ILogFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [imageList, setImageList] = useState<IImageList[]>([]);
  const [imageRequired, setImageRequired] = useState(false);

  const { data: logData } = useGetLog(Number(id || -1));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddLogFormData>({
    resolver: zodResolver(zodAddLog),
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    if (logData) {
      reset({
        content: logData.content,
      });

      // 기존 이미지 설정
      if (logData.image_urls) {
        setImageList(
          logData.image_urls.map((url: string, index: number) => ({
            id: String(index),
            src: url,
          })),
        );
      }
    }
  }, [logData, reset]);

  const { mutate: addLog } = useAddLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push('/feed');
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
        showToast({ message: '일기 작성 완료!', type: 'success' });
      }
    },
  });

  const { mutate: editLog } = useEditLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push('/feed');
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
        queryClient.invalidateQueries({ queryKey: [FEED_QUERY_KEY, id] });
        showToast({ message: '일기 수정 완료!', type: 'success' });
      }
    },
  });

  const onSubmit: SubmitHandler<TAddLogFormData> = async (data) => {
    if (imageList?.length < 1) {
      setImageRequired(true);

      return;
    }

    const formData = new FormData();

    formData.append(
      'controllerRequestDto',
      JSON.stringify({
        ...data,
        image_urls: imageList
          .filter((image) => image.src.startsWith('https'))
          .map((image) => image.src),
        category: '게시판',
      }),
    );

    imageList.forEach((image) => {
      if (image.file) {
        formData.append('multipartFiles', image.file);
      }
    });

    if (id) {
      editLog({ id, formData });
    } else {
      addLog(formData);
    }
  };

  console.log(imageList, 'imageList');

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
          {id ? '수정하기' : '작성하기'}
        </Button>
      </div>
    </form>
  );
};

export default LogForm;
