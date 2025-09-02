import { KanaSoundType } from '@/types/kana';

export type OnSelectRows = ({ key, value }: { key: KanaSoundType; value: string[] }) => void;
