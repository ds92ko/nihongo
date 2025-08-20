import KanaTabs from '@/components/KanaTabs';

const baseRows = [
  { label: 'あ행', kana: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'か행', kana: ['か', 'き', 'く', 'け', 'こ'] },
  { label: 'さ행', kana: ['さ', 'し', 'す', 'せ', 'そ'] },
  { label: 'た행', kana: ['た', 'ち', 'つ', 'て', 'と'] },
  { label: 'な행', kana: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { label: 'は행', kana: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { label: 'ま행', kana: ['ま', 'み', 'む', 'め', 'も'] },
  { label: 'や행', kana: ['や', '', 'ゆ', '', 'よ'] },
  { label: 'ら행', kana: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { label: 'わ행', kana: ['わ', '', '', '', 'を'] },
  { label: 'ん', kana: ['ん', '', '', '', ''] }
];

const dakuonRows = [
  { label: 'が행', kana: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { label: 'ざ행', kana: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { label: 'だ행', kana: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { label: 'ば행', kana: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { label: 'ぱ행', kana: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] }
];

const youonRows = [
  { label: 'きゃ행', kana: ['きゃ', 'きゅ', 'きょ'] },
  { label: 'ぎゃ행', kana: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
  { label: 'しゃ행', kana: ['しゃ', 'しゅ', 'しょ'] },
  { label: 'じゃ행', kana: ['じゃ', 'じゅ', 'じょ'] },
  { label: 'ちゃ행', kana: ['ちゃ', 'ちゅ', 'ちょ'] },
  { label: 'にゃ행', kana: ['にゃ', 'にゅ', 'にょ'] },
  { label: 'ひゃ행', kana: ['ひゃ', 'ひゅ', 'ひょ'] },
  { label: 'びゃ행', kana: ['びゃ', 'びゅ', 'びょ'] },
  { label: 'ぴゃ행', kana: ['ぴゃ', 'ぴゅ', 'ぴょ'] },
  { label: 'みゃ행', kana: ['みゃ', 'みゅ', 'みょ'] },
  { label: 'りゃ행', kana: ['りゃ', 'りゅ', 'りょ'] }
];

const TABS = [
  { key: 'basic', title: '청음', rows: baseRows },
  { key: 'dakuon', title: '탁음/반탁음', rows: dakuonRows },
  { key: 'youon', title: '요음', rows: youonRows }
];

export default function Hiragana() {
  return <KanaTabs tabs={TABS} />;
}
