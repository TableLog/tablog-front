import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { useChangePassword } from '@/hooks/auth.hooks';
import { zodChangePassword } from '@/lib/zod/zodValidation';
import { useUserStore } from '@/lib/zutstand/userStore';
import { TChangePasswordFormValues } from '@/types/api';
import { showToast } from '@/utils/functions';

interface IChangePasswordFormProps {
  accountInfo: { provider: string; email: string };
}
const ChangePasswordForm = ({ accountInfo }: IChangePasswordFormProps) => {
  const router = useRouter();

  const { setFoundEmail } = useUserStore();

  const { mutate: changePassowrd } = useChangePassword({
    onSuccess: (res) => {
      if (res.status === 200) {
        router.replace('/login');

        showToast({
          message: (
            <div>
              <p>비밀번호 변경이 완료되었습니다.</p>

              <p>로그인을 진행해주세요.</p>
            </div>
          ),
          type: 'success',
        });
      }
    },
  });

  const provider = useMemo(() => {
    switch (accountInfo.provider) {
      case 'local':
        return '이메일';

      case 'kakao':
        return '카카오';

      case 'google':
        return '구글';

      default:
        break;
    }
  }, [accountInfo.provider]);

  const navigateToLoginPage = () => {
    router.push('/login');
    setFoundEmail(accountInfo.email);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordFormValues>({
    resolver: zodResolver(zodChangePassword),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<TChangePasswordFormValues> = async (data) => {
    changePassowrd({ email: accountInfo.email, newPassword: data.password });
  };

  return (
    <div>
      <section>
        <div className="bg-grey08 mb-11 flex flex-col items-center justify-center gap-4 py-5">
          <Text fontSize={14}>가입하신 계정 정보입니다.</Text>

          <div className="flex flex-col items-center justify-center gap-2">
            <Text fontSize={14}>[{provider} 회원가입]</Text>

            <Text fontSize={16} fontWeight="semiBold">
              {accountInfo.email}
            </Text>
          </div>
        </div>

        <Button full onClick={navigateToLoginPage}>
          <Text color="white01">로그인하기</Text>
        </Button>
      </section>

      {accountInfo.provider === 'local' && (
        <>
          <div className="divider"></div>

          <section>
            <Text fontWeight="semiBold" className="mb-13 text-center">
              비밀번호 변경하기
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-11">
                <TextInput
                  type="password"
                  category="password"
                  register={register}
                  errors={errors}
                />

                <TextInput
                  type="password"
                  category="confirmPassword"
                  register={register}
                  errors={errors}
                />
              </div>

              <Button full type="submit">
                <Text color="white01">비밀번호 변경하기</Text>
              </Button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default ChangePasswordForm;
