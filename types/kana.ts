export type KanaType = 'hiragana' | 'katakana';
export type KanaSoundType = 'seion' | 'dakuon' | 'youon';

export type KanaToRomaji = {
  [key in KanaType]: {
    [key: string]: string;
  };
};

export interface KanaRow {
  label: string;
  kana: string[];
}

interface KanaTab {
  key: KanaSoundType;
  title: string;
  rows: KanaRow[];
}

export type KanaTabs = {
  [key in KanaType]: KanaTab[];
};

interface KanaContext {
  kanaType: KanaType;
  isVisibleGrid: boolean;
  isAutoDelete: boolean;
}

interface KanaActions {
  setKanaType: () => void;
  setIsVisibleGrid: () => void;
  setIsAutoDelete: (isAutoDelete: boolean) => void;
}

export interface KanaStore {
  context: KanaContext;
  actions: KanaActions;
}
