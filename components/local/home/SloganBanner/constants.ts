import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CONTAINER_PADDING_HORIZONTAL = 16;
const BANNER_INNER_WIDTH = width - CONTAINER_PADDING_HORIZONTAL * 4;

export const SLOGAN_IMAGE_WIDTH = BANNER_INNER_WIDTH * 0.7;
export const SLOGAN_IMAGE_HEIGHT = SLOGAN_IMAGE_WIDTH * 0.383;
export const MATE_IMAGE_SIZE = BANNER_INNER_WIDTH * 0.3;
