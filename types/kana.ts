export type KanaType = 'hiragana' | 'katakana';

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
  key: string;
  title: string;
  rows: KanaRow[];
}

export type KanaTabs = {
  [key in KanaType]: Tab[];
};
