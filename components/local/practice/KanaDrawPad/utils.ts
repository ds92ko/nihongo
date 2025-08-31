import { Point } from '@/components/local/practice/KanaCanvas/types';

export const getD = (path: Point[]) =>
  path
    .map((point, j) => (j === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
    .join(' ');
