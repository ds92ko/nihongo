import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

interface Row {
  label: string;
  kana: string[];
}

interface Tab {
  key: string;
  title: string;
  rows: Row[];
}

interface Props {
  tabs: Tab[];
}

const KanaTabs = ({ tabs }: Props) => {
  const [activeTab, setActiveTab] = useState('basic');
  const currentRows = tabs.find(t => t.key === activeTab)?.rows ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map(tab => (
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
      <FlatList
        data={currentRows}
        scrollEnabled={true}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.tabPanel}
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

export default KanaTabs;
