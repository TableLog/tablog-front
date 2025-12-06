'use client';

import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { LICENSE_COUNT_QUERY_KEY } from '@/constants/query-key.constants';
import {
  useGetLicenseCount,
  useGetLicenseList,
  useRequestExpertVerification,
  useUploadLicense,
} from '@/hooks/queries/my.hooks';
import { convertDateFormat, showToast } from '@/utils/functions';

const CertificatePage = () => {
  const queryClient = useQueryClient();

  const [licenseType, setLicenseType] = useState<string>('');

  const { data: licenseCount } = useGetLicenseCount();
  const { data: licenseList } = useGetLicenseList(licenseType);

  const { mutate: uploadLicense } = useUploadLicense({
    onSuccess: (res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: [LICENSE_COUNT_QUERY_KEY] });
        showToast({ message: '등록되었습니다.', type: 'success' });
      }
    },
  });
  const { mutate: requestExpertVerification } = useRequestExpertVerification();

  // 각 등록 버튼마다 별도의 ref 생성
  const imgRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [isOpen, setIsOpen] = useState<number>(0);

  const certificateList = [
    {
      title: '총 레시피',
      count: licenseCount?.recipeCount,
    },
    {
      title: '사업자 등록증',
      count: licenseCount?.businessCount,
      licenseType: 'BUSINESS_REGISTRATION',
    },
    {
      title: '특허증',
      count: licenseCount?.patentCount,
      licenseType: 'PATENT',
    },
  ];

  const onChangeImageFile = (index: number, licenseType: string) => {
    const files = imgRefs[index]?.current?.files || null;

    if (!files || files.length === 0) return;

    const formData = new FormData();

    // 여러 파일을 모두 FormData에 추가
    for (let i = 0; i < files.length; i++) {
      formData.append('multipartFile', files[i]);
    }

    formData.append(
      'controllerRequestDto',
      JSON.stringify({
        licenseName: files[0].name,
        licenseType: licenseType,
      }),
    );

    uploadLicense(formData);
  };

  const handleDownload = (url: string, filename: string) => {
    fetch(url, { method: 'GET' })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((err) => {
        console.error('err: ', err);
      });
  };

  return (
    <div className="relative px-5 pb-4">
      <PageHeader title="전문가 인증하기" back />

      <BottomSheet
        isOpen={isOpen !== 0}
        onClose={() => setIsOpen(0)}
        title={`등록한 ${certificateList[isOpen].title}`}
      >
        <div className="flex flex-col gap-5 px-4">
          {licenseList?.licenses.map((item) => (
            <div key={item.id} className="flex justify-between">
              <button
                onClick={() => handleDownload(item.imageUrl, item.licenseName)}
                className="text-left underline"
              >
                {item.licenseName}
              </button>

              <p>{convertDateFormat(item.modifiedAt)}</p>
            </div>
          ))}

          <div className="absolute bottom-5 left-4 right-4 mt-6">
            <Button buttonColor="grey04" full onClick={() => setIsOpen(0)}>
              닫기
            </Button>
          </div>
        </div>
      </BottomSheet>

      <section className="flex flex-col gap-4 font-light">
        <div className="flex flex-col gap-2">
          <p>
            🔎 등록된 레시피가 <b className="text-primary">50개 이상</b>이거나{' '}
            <b className="text-primary">사업장 등록증</b> 또는{' '}
            <b className="text-primary">레시피 특허증</b>을 등록하시면 전문가가 되어 레시피를 유료로
            등록하실 수 있습니다.
          </p>
          <p>🔎 유료로 등록한 레시피의 재료 및 요리 과정은 유료 결제한 회원들에게만 노출됩니다.</p>
          <p>🔎 유료 레시피의 경우 수정만 가능하고 삭제는 불가능합니다. </p>
          <p>
            🔎 삭제가 불가피한 경우에는 관리자에게 문의해주세요.
            <Link href="/my/inquiry" className="ml-1 text-sm underline">
              문의하기
            </Link>
          </p>
        </div>

        <div>
          <p>전문가 인증을 요청해주시면 관리자가 확인 후 인증 상태를 업데이트해드립니다.</p>
          <p>
            영업일 기준 <b className="text-primary">3~5일</b> 소요됩니다.
          </p>
        </div>

        <div>
          ❗ 전문가 인증 후에 인증받은 레시피를 삭제하시거나 부정한 방법으로 서비스를 이용하실 경우
          전문가 인증 취소 및 포인트 차감이 될 수 있는 점 유의해주시기 바랍니다.
        </div>
      </section>

      <section className="my-4 flex justify-around gap-4 font-light">
        {certificateList.map((item, idx) => (
          <ul key={item.title} className="flex flex-col items-center gap-1">
            <li>{item.title}</li>

            <li className="mb-1 mt-2 underline">
              {idx === 0 ? (
                <Link href="/my/recipe/register">
                  <button className="underline">{item.count}</button>
                </Link>
              ) : (
                <button
                  className="underline"
                  onClick={() => {
                    if (!item.licenseType) return;

                    setLicenseType(item.licenseType);
                    setIsOpen(idx);
                  }}
                >
                  {item.count}
                </button>
              )}
            </li>

            <li>
              <Button buttonColor="grey04" size="mini">
                <label htmlFor={`license-${idx}`}>
                  <input
                    id={`license-${idx}`}
                    type="file"
                    name={`license-${idx}`}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={() => {
                      const licenseType = certificateList[idx].licenseType;

                      if (!licenseType) return;

                      onChangeImageFile(idx, licenseType);
                    }}
                    ref={imgRefs[idx]}
                  />
                  등록
                </label>
              </Button>
            </li>
          </ul>
        ))}
      </section>

      <section className="fixed bottom-5 left-4 right-4 mt-6">
        <div className="mb-3 text-center text-sm text-red01">
          <p>전문가 인증을 마친 레시피 및 등록증은</p>
          <p>삭제하실 수 없습니다.</p>
        </div>

        <Button buttonColor="primary" full onClick={() => requestExpertVerification()}>
          전문가 인증 요청
        </Button>
      </section>
    </div>
  );
};

export default CertificatePage;
