'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddLog, useEditLog, useGetLog } from '@/hooks/queries/feed.hooks';
import { zodAddLog } from '@/lib/zod/zodValidation';
import { TAddLogFormData } from '@/types/api';
import { showToast } from '@/utils/functions';

interface ILogFormProps {
  logId?: number;
}

const LogForm = ({ logId }: ILogFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [imageRequired, setImageRequired] = useState(false);

  const { data: logData } = useGetLog(logId ?? -1);

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

  const { mutate: addLog, isPending: isAddingLog } = useAddLog({
    onSuccess: (res) => {
      if (res.status === 201) {
        router.push('/feed');
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.LIST() });
        showToast({ message: '일기 작성 완료!', type: 'success' });
      }
    },
    onError: (err) => {
      if (err.status === 403) {
        showToast({ message: '권한이 없습니다.', type: 'error' });
      }
    },
  });

  const { mutate: editLog, isPending: isEditingLog } = useEditLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push('/feed');
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.LIST() });
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.DETAIL(logId ?? -1) });
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

    if (logId) editLog({ logId, formData });
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
        <TextArea category="content" register={register} errors={errors} maxLength={300} />
      </div>

      <div className="mt-24">
        <Button full type="submit" disabled={isAddingLog || isEditingLog}>
          {logId
            ? isEditingLog
              ? '수정중...'
              : '수정하기'
            : isAddingLog
              ? '작성중...'
              : '작성하기'}
        </Button>
      </div>
    </form>
  );
};

export default LogForm;
