import { Status } from '@/types/status';
import { Dimensions } from 'react-native';

export const TOAST_VARIANTS: Status[] = ['success', 'error', 'warning', 'info'];

const { width } = Dimensions.get('window');
const CONTAINER_PADDING_HORIZONTAL = 16;
export const TOAST_WIDTH = width - CONTAINER_PADDING_HORIZONTAL * 2;

const HEADER_HEIGHT = 68;
const CONTAINER_PADDING_VERTICAL = 24;
export const TOAST_TOP_OFFSET = HEADER_HEIGHT + CONTAINER_PADDING_VERTICAL;
