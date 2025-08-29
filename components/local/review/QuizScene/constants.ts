import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const ROWS_PADDING_TOP = 16;
export const ROWS_GAP = 8;
export const PER_ROW = 3;
export const ROW_WIDTH = Math.floor(
  (width - ROWS_PADDING_TOP * 2 - ROWS_GAP * (PER_ROW - 1)) / PER_ROW
);
export const ROW_HEIGHT = 36;

export const tips = [
  '퀴즈를 진행할 행을 선택한 뒤, 원하는 방식으로 시작해보세요.',
  '읽기 퀴즈는 제시된 문자를 보고 발음을 맞히는 방식이에요.',
  '표기 퀴즈는 제시된 발음에 맞는 문자를 맞히는 방식이에요.'
];
