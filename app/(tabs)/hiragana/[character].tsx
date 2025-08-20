import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function KanaScreen() {
  const { character } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Details of Kana {character} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
});
