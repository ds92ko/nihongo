import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
  const [activeTab, setActiveTab] = useState('basic');
  const currentRows = TABS.find(t => t.key === activeTab)?.rows ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === tab.key ? Colors.white : Colors.primary10
              }
            ]}
          >
            <Text
              weight={500}
              variant="body2"
              color={activeTab === tab.key ? 'primary' : 'textPrimary'}
            >
              {tab.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.tabPanel}>
        <FlatList
          data={currentRows}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.labelCell}>
                <Text
                  weight={700}
                  variant="caption"
                >
                  {item.label}
                </Text>
              </View>
              {item.kana.map((kana, j) => (
                <View
                  key={j}
                  style={[styles.cell, !kana && styles.emptyCell]}
                >
                  <Text
                    weight={500}
                    variant="body2"
                  >
                    {kana}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: Colors.primary30,
    gap: 2
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  tabPanel: {
    padding: 16,
    backgroundColor: Colors.white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  labelCell: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary10
  },
  emptyCell: {
    backgroundColor: Colors.white
  }
});
