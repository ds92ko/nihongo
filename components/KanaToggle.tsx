import { Colors } from '@/constants/Colors';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet } from 'react-native';

const KanaToggle = () => {
  const { kanaType } = useKanaContext();
  const { setKanaType } = useKanaActions();

  return (
    <Pressable
      style={styles.toggleButton}
      onPress={() => setKanaType()}
    >
      <MaterialCommunityIcons
        style={[
          styles.kanaIcon,
          {
            backgroundColor: kanaType === 'hiragana' ? Colors.white : Colors.primary10
          }
        ]}
        name="syllabary-hiragana"
        size={20}
        color={kanaType === 'hiragana' ? Colors.primary : Colors.textSecondary}
      />
      <MaterialCommunityIcons
        style={[
          styles.kanaIcon,
          {
            backgroundColor: kanaType === 'katakana' ? Colors.white : Colors.primary10
          }
        ]}
        name="syllabary-katakana"
        size={20}
        color={kanaType === 'katakana' ? Colors.primary : Colors.textSecondary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden'
  },
  kanaIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 8
  }
});

export default KanaToggle;
