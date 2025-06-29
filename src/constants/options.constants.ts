import { ECookTime, EPrice, ERecipeOption } from '@/types/enum';

export const UNIT_OPTIONS = [
  { id: 1, title: '킬로그램 (kg)', name: 'kg' },
  { id: 2, title: '그램 (g)', name: 'g' },
  { id: 3, title: '밀리리터 (mL)', name: 'mL' },
  { id: 4, title: '리터 (L)', name: 'L' },
  { id: 5, title: '컵 (200mL)', name: 'cup' },
  { id: 6, title: '테이블 스푼', name: 'tbsp' },
  { id: 7, title: '개', name: '개' },
];

export const RECIPE_FILTER_OPTIONS = [
  { id: 1, title: '최신순', name: 'latest' },
  { id: 2, title: '인기순', name: 'popular' },
];

export const SERVING_OPTIONS = [
  { id: 1, title: '1인분', name: '1' },
  { id: 2, title: '2인분', name: '2' },
  { id: 3, title: '3인분', name: '3' },
  { id: 4, title: '4인분', name: '4' },
];

export const RECIPE_CATEGORY_LIST = [
  { id: 1, title: '밥요리', icon: '🍚' },
  { id: 2, title: '면요리', icon: '🍜' },
  { id: 3, title: '밑반찬', icon: '🍳' },
  { id: 4, title: '국/찌개', icon: '🥘' },
  { id: 5, title: '아침', icon: '🥞' },
  { id: 6, title: '점심', icon: '🌮' },
  { id: 7, title: '저녁', icon: '🍲' },
  { id: 8, title: '간식/후식', icon: '🍰' },
];

export const CALORIE_OPTIONS = [
  { id: 0, title: '500kcal', value: '0', name: 'UNDER_500' },
  { id: 1, title: '1000kcal', value: '1', name: 'RANGE_500_1000' },
  { id: 2, title: '1000kcal+', value: '2', name: 'OVER_1000' },
];

export const PRICE_OPTIONS = [
  { id: 0, title: EPrice['p5000'], value: '0', name: 'p5000' },
  { id: 1, title: EPrice['p10000'], value: '1', name: 'p10000' },
  { id: 2, title: EPrice['p50000'], value: '2', name: 'p50000' },
  { id: 3, title: EPrice['p100000'], value: '3', name: 'p100000' },
  { id: 4, title: EPrice['p100000_plus'], value: '4', name: 'p100000_plus' },
];

export const COOK_TIME_OPTIONS = [
  { id: 0, title: ECookTime['minute_10'], value: '0', name: 'minute_10' },
  { id: 1, title: ECookTime['minute_30'], value: '1', name: 'minute_30' },
  { id: 2, title: ECookTime['hour_1'], value: '2', name: 'hour_1' },
  { id: 3, title: ECookTime['hour_1_plus'], value: '3', name: 'hour_1_plus' },
];

export const TERMS_OPTIONS = [
  {
    id: 1,
    label: '서비스 이용약관',
    name: 'useterm',
    content: `공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는
          공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다.
          사법권은 법관으로 구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을
          때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 공무원의 직무상
          불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한
          배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 사법권은 법관으로
          구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는
          연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.`,
  },
  {
    id: 2,
    label: '개인정보 수집 및 이용',
    name: 'privacy',
    content: `공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는
          공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다.
          사법권은 법관으로 구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을
          때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 공무원의 직무상
          불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한
          배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 사법권은 법관으로
          구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는
          연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.`,
  },
  {
    id: 3,
    label: '마케팅 정보 수신 동의 (선택)',
    name: 'marketing',
    content: `공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는
          공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다.
          사법권은 법관으로 구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을
          때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 공무원의 직무상
          불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한
          배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 사법권은 법관으로
          구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는
          연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.`,
  },
];

export const RECIPE_OPTIONS = [
  { id: 1, title: ERecipeOption.PROFILE },
  { id: 2, title: ERecipeOption.CHAT },
  { id: 3, title: ERecipeOption.REPORT, alert: true },
];

export const RECIPE_MY_OPTIONS = [
  { id: 1, title: ERecipeOption.EDIT },
  { id: 2, title: ERecipeOption.DELETE, alert: true },
];

export const FEED_MY_OPTIONS = [
  { id: 1, title: '수정하기' },
  { id: 2, title: '삭제하기', alert: true },
];

export const FEED_OPTIONS = [
  { id: 1, title: '채팅하기' },
  { id: 2, title: '신고하기', alert: true },
];
