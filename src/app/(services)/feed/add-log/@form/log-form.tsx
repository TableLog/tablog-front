'use client';

import { useEffect, useState } from 'react';
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

interface ILogFormProps {
  id?: number;
}

const LogForm = ({ id }: ILogFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [imageRequired, setImageRequired] = useState(false);

  const { data: logData } = useGetLog(Number(id || -1));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddLogFormData>({
    resolver: zodResolver(zodAddLog),
    mode: 'onChange',
    defaultValues: {
      content: '',
      images: [],
    },
  });

  useEffect(() => {
    if (logData) {
      reset({
        content: logData.content,
        images: logData.image_urls,
      });
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
    const { images, ...feedData } = data;

    if (images?.length < 1) {
      setImageRequired(true);
      return;
    }

    const formData = new FormData();

    formData.append(
      'controllerRequestDto',
      JSON.stringify({
        ...feedData,
        image_urls: images.filter((image) => typeof image === 'string'), // https...
        category: '게시판',
      }),
    );

    images
      .filter((image) => image instanceof File)
      .forEach((imageFile) => {
        formData.append('multipartFiles', imageFile);
      });

    if (id) editLog({ id, formData });
    else addLog(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <RecipeImageInput
          half
          control={control}
          name="images"
          error={imageRequired}
          defaultImages={logData?.image_urls}
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
