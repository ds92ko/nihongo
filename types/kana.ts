export type KanaType = 'hiragana' | 'katakana';

export type KanaToRomaji = {
  [key in KanaType]: {
    [key: string]: string;
  };
};

interface Row {
  label: string;
  kana: string[];
}

interface Tab {
  key: string;
  title: string;
  rows: Row[];
}

export type KanaTabs = {
  [key in KanaType]: Tab[];
};
