import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const DAYS_IN_WEEK = 7;

export const CONTAINER_PADDING_HORIZONTAL = 16;
export const WEEKLY_PADDING = 16;
export const WEEKDAYS_GAP = 8;
export const WEEKLY_STAMP_SIZE = 26;
export const WEEKLY_IMAGE_SIZE =
  width -
  CONTAINER_PADDING_HORIZONTAL * 2 -
  WEEKLY_PADDING -
  WEEKLY_STAMP_SIZE * DAYS_IN_WEEK -
  WEEKDAYS_GAP * (DAYS_IN_WEEK - 1);

export const WEEKLY_IMAGES = [
  'mocking',
  'ok',
  'yes',
  'good',
  'happy',
  'love',
  'blushing',
  'sing',
  'excited'
];
