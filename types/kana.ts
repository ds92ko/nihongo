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

interface Tab {
  key: KanaSoundType;
  title: string;
  rows: KanaRow[];
}

export type KanaTabs = {
  [key in KanaType]: Tab[];
};
