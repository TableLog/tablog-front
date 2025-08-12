'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import RecipeItem from '@/app/(services)/recipe/recipe-item';
import { useGetRecipeSearch } from '@/hooks/recipe.hooks';
import useDebounce from '@/hooks/useDebounce';

import { BoxIcon } from '../atoms/icon/BoxIcon';
import SearchInput from '../atoms/input/SearchInput';
import LoadingSpinner from '../atoms/loading/LoadingSpinner';
import { Text } from '../atoms/text/Text';
import Content from '../templates/content/Content';

interface SearchProps {
  handleCloseSearch: () => void;
}

const RECENT_KEYWORDS_KEY = 'tablog-recent-key';

interface KeywordType {
  id: string;
  title: string;
}

export default function Search({ handleCloseSearch }: SearchProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [recentKeywords, setRecentKeywords] = useState<KeywordType[]>([]);
  const { ref, inView } = useInView();
  const debouncedKeyword = useDebounce(keyword, 600);

  const { data, hasNextPage, fetchNextPage, isFetching, isPending } = useGetRecipeSearch({
    keyword: debouncedKeyword,
    pageNumber: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const storageItem = localStorage.getItem(RECENT_KEYWORDS_KEY);
    if (!storageItem) return;
    const parsedStorageItem = JSON.parse(storageItem);
    setRecentKeywords(parsedStorageItem);
    // ! storage 값 타입체크 필요
  }, []);

  useEffect(() => {
    if (debouncedKeyword.length === 0) return;
    addKeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  const addKeyword = (newKeyword: string) => {
    setRecentKeywords((prev) => {
      const updated = [
        ...prev.filter((keyword) => keyword.title !== newKeyword),
        { id: crypto.randomUUID(), title: newKeyword },
      ];
      if (updated.length > 5) updated.shift();
      localStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteKeyword = (id: string) => {
    setRecentKeywords((prev) => {
      const updated = prev.filter((k) => k.id !== id);
      localStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Content className="relative">
      <div className="sticky top-4 z-10 flex gap-5 px-1">
        <SearchInput
          className="flex-1"
          placeholder="요리명 혹은 작성자명을 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
        />
        <button
          type="button"
          className="rounded-full bg-white01 px-3.5 py-1"
          onClick={handleCloseSearch}
        >
          <Text fontWeight="medium" color="grey03" fontSize={14}>
            닫기
          </Text>
        </button>
      </div>
      {keyword.length === 0 ? (
        <div className="mt-8">
          <div className="mb-3.5 flex items-center gap-2.5">
            <Text fontWeight="semiBold">최근 검색어</Text>
            <Text fontSize={14} color="grey03">
              최대 5개
            </Text>
          </div>

          <div className="flex flex-col-reverse gap-1">
            {recentKeywords.length === 0 ? (
              <Text fontSize={14}>최근 검색어가 없습니다</Text>
            ) : (
              recentKeywords.map((keyword) => (
                <div key={keyword.id} className="flex justify-between py-1">
                  <button
                    type="button"
                    className="flex-grow overflow-hidden text-start"
                    onClick={() => {
                      setKeyword(keyword.title);
                    }}
                  >
                    <Text className="truncate">{keyword.title}</Text>
                  </button>
                  <button type="button" onClick={() => deleteKeyword(keyword.id)}>
                    <BoxIcon name="x" size={24} color="grey03" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-grow flex-col gap-4 overflow-auto">
          {!isPending && data?.recipes.length === 0 ? (
            <Text fontSize={14}>{keyword}에 해당하는 검색 결과가 없습니다</Text>
          ) : (
            data?.recipes.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} onClick={handleCloseSearch} />
            ))
          )}
        </div>
      )}
      {isFetching && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <div ref={ref} />
    </Content>
  );
}
