import KanaList from '@/components/KanaList';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { KanaType } from '@/types/kana';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
  type: KanaType;
}

const KanaTabs = ({ type }: Props) => {
  const [activeTab, setActiveTab] = useState('basic');
  const currentRows = KANA_TABS[type].find(t => t.key === activeTab)?.rows ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {KANA_TABS[type].map(tab => (
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
              weight={activeTab === tab.key ? 700 : 500}
              variant="body2"
              color={activeTab === tab.key ? 'primary' : 'textPrimary'}
            >
              {tab.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <KanaList
        data={currentRows}
        type={type}
        contentContainerStyle={styles.tabPanel}
      />
    </View>
  );
};

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
    backgroundColor: Colors.white,
    gap: 8
  }
});

export default KanaTabs;
