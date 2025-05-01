export const LABEL_MAP = {
  userName: '이름',
  email: '이메일',
  birthday: '생년월일',
  password: '비밀번호',
  confirmPassword: '비밀번호 확인',
  nickname: '닉네임',
  recipeName: '요리명',
  stepTitle: '순서 제목',
  quantity: '용량',
  reportContent: '신고 사유',
  unit: '단위',
  search: '',
} as const;

export const PLACEHOLDER_MAP = {
  userName: '이름을 입력해주세요.',
  email: '이메일을 입력해주세요.',
  birthday: '생년월일을 입력해주세요. (2000-01-01)',
  password: '비밀번호를 입력해주세요.',
  confirmPassword: '비밀번호를 한 번더 입력해주세요.',
  nickname: '닉네임을 입력해주세요. (최대 10글자)',
  recipeName: '요리명을 입력해주세요.',
  stepTitle: '순서 제목을 입력해주세요.',
  quantity: '용량을 입력해주세요.',
  reportContent: '신고 사유를 입력해주세요. (최대 300글자)',
  unit: '단위를 입력해주세요.',
  search: '요리명 혹은 작성자명을 입력해주세요.',
} as const;
