import KanaTabs from '@/components/KanaTabs';

const baseRows = [
  { label: 'ア행', kana: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
  { label: 'カ행', kana: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
  { label: 'サ행', kana: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
  { label: 'タ행', kana: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
  { label: 'ナ행', kana: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
  { label: 'ハ행', kana: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
  { label: 'マ행', kana: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
  { label: 'ヤ행', kana: ['ヤ', '', 'ユ', '', 'ヨ'] },
  { label: 'ラ행', kana: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
  { label: 'ワ행', kana: ['ワ', '', '', '', 'ヲ'] },
  { label: 'ン', kana: ['ン', '', '', '', ''] }
];

const dakuonRows = [
  { label: 'ガ행', kana: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'] },
  { label: 'ザ행', kana: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'] },
  { label: 'ダ행', kana: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'] },
  { label: 'バ행', kana: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'] },
  { label: 'パ행', kana: ['パ', 'ピ', 'プ', 'ペ', 'ポ'] }
];

const youonRows = [
  { label: 'キャ행', kana: ['キャ', 'キュ', 'キョ'] },
  { label: 'ギャ행', kana: ['ギャ', 'ギュ', 'ギョ'] },
  { label: 'シャ행', kana: ['シャ', 'シュ', 'ショ'] },
  { label: 'ジャ행', kana: ['ジャ', 'ジュ', 'ジョ'] },
  { label: 'チャ행', kana: ['チャ', 'チュ', 'チョ'] },
  { label: 'ニャ행', kana: ['ニャ', 'ニュ', 'ニョ'] },
  { label: 'ヒャ행', kana: ['ヒャ', 'ヒュ', 'ヒョ'] },
  { label: 'ビャ행', kana: ['ビャ', 'ビュ', 'ビョ'] },
  { label: 'ピャ행', kana: ['ピャ', 'ピュ', 'ピョ'] },
  { label: 'ミャ행', kana: ['ミャ', 'ミュ', 'ミョ'] },
  { label: 'リャ행', kana: ['リャ', 'リュ', 'リョ'] }
];

const TABS = [
  { key: 'basic', title: '청음', rows: baseRows },
  { key: 'dakuon', title: '탁음/반탁음', rows: dakuonRows },
  { key: 'youon', title: '요음', rows: youonRows }
];

export default function Katakana() {
  return <KanaTabs tabs={TABS} />;
}
