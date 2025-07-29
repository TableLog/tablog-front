'use client';
import { FormEvent, useEffect, useState } from 'react';

import { BoxIcon } from '../atoms/icon/BoxIcon';
import SearchInput from '../atoms/input/SearchInput';
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

  useEffect(() => {
    const storageItem = localStorage.getItem(RECENT_KEYWORDS_KEY);
    if (!storageItem) return;
    setRecentKeywords(JSON.parse(storageItem));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(keyword);
  };

  const search = (keyword: string) => {
    if (keyword.length === 0) return;
    addKeyword(keyword);
  };

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
    <Content>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 flex gap-5 px-1">
          <SearchInput
            className="flex-1"
            placeholder="요리명 혹은 작성자명을 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="button" onClick={handleCloseSearch}>
            <Text fontWeight="medium" color="grey03" fontSize={14}>
              닫기
            </Text>
          </button>
        </div>
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <Text fontWeight="semiBold">최근 검색어</Text>
            <Text fontSize={14} color="grey03">
              최대 5개
            </Text>
          </div>

          <div className="flex flex-col-reverse gap-1">
            {recentKeywords.length === 0 && <Text fontSize={14}>최근 검색어가 없습니다.</Text>}
            {recentKeywords.map((keyword) => (
              <div key={keyword.id} className="flex justify-between py-1">
                <button
                  type="button"
                  className="flex-grow overflow-hidden text-start"
                  onClick={() => {
                    setKeyword(keyword.title);
                    search(keyword.title);
                  }}
                >
                  <Text className="truncate">{keyword.title}</Text>
                </button>
                <button type="button" onClick={() => deleteKeyword(keyword.id)}>
                  <BoxIcon name="x" size={24} color="grey03" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Content>
  );
}
