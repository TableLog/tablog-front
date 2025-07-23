export enum EUserRole {
  EXPERT = 'EXPERT',
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
}

export enum EPrice {
  p5000 = '5,000',
  p10000 = '10,000',
  p50000 = '50,000',
  p100000 = '100,000',
  p100000_plus = '100,000+',
}

export enum ECookTime {
  minute_10 = '10분',
  minute_30 = '30분',
  hour_1 = '1시간',
  hour_1_plus = '1시간+',
}

export enum ERecipeOption {
  PROFILE = '작성자 프로필 보기',
  CHAT = '채팅하기',
  REPORT = '신고하기',
  EDIT = '수정하기',
  DELETE = '삭제하기',
}

export enum EReportType {
  BOARD = 'R_BOARD',
  RECIPE = 'R_RECIPE',
  USER = 'R_USER',
}
