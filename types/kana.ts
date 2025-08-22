export type KanaType = 'hiragana' | 'katakana';
export type KanaTabType = 'basic' | 'dakuon' | 'youon';

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
  key: KanaTabType;
  title: string;
  rows: KanaRow[];
}

export type KanaTabs = {
  [key in KanaType]: Tab[];
};
