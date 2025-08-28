import Accordion from '@/components/Accordion';
import EmptyState from '@/components/EmptyState';
import InfoCard from '@/components/InfoCard';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import {
  Mistake,
  MistakeMode,
  useMistakeActions,
  useMistakeContext
} from '@/stores/useMistakeStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

const MISTAKES_PADDING_TOP = 16;
const MISTAKES_GAP = 12;
const MISTAKE_HEIGHT = 52;

const tips = [
  '오답을 틀린 횟수가 많은 순서대로 확인하고, 다시 학습해보세요.',
  '문자와 발음을 함께 보거나, 문자 혹은 발음만 볼 수 있어요.',
  '퀴즈에서 틀린 문제를 다시 맞히면 오답 노트에서 사라져요.'
];

const MistakeScene = () => {
  const { kanaType } = useKanaContext();
  const { playKanaAudio, playing } = useKanaAudio();
  const { playPopAudio } = usePopAudio();
  const { mistakes } = useMistakeContext();
  const { setMistake, setMistakeModes } = useMistakeActions();

  const isEmpty = !mistakes[kanaType].length;
  const isBothMode = !isEmpty && mistakes[kanaType].every(mistake => mistake.mode === 'both');
  const isCharacterMode =
    !isEmpty && mistakes[kanaType].every(mistake => mistake.mode === 'character');
  const isPronunciationMode =
    !isEmpty && mistakes[kanaType].every(mistake => mistake.mode === 'pronunciation');
  const groupedMistakes = Object.entries(
    mistakes[kanaType].reduce<Record<number, Mistake[]>>((groups, mistake) => {
      groups[mistake.count] = mistakes[kanaType].filter(n => n.count === mistake.count);
      return groups;
    }, {})
  ).sort((a, b) => Number(b[0]) - Number(a[0]));

  const handleToggleAllMode = (mode: MistakeMode) => {
    playPopAudio();
    setMistakeModes(kanaType, mode);
  };

  const handleToggleMode = ({ mode, ...mistake }: Mistake) => {
    playPopAudio();
    setMistake(kanaType, {
      ...mistake,
      mode: mode === 'both' ? 'character' : mode === 'character' ? 'pronunciation' : 'both'
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <InfoCard tips={tips} />
        <View style={styles.controls}>
          <Pressable
            style={[
              styles.button,
              isBothMode && styles.activeButton,
              isEmpty && styles.disabledButton
            ]}
            disabled={isEmpty}
            onPress={() => handleToggleAllMode('both')}
          >
            <Text
              weight={isBothMode ? 700 : 500}
              variant="body2"
              color={isEmpty ? 'neutral' : isBothMode ? 'textPrimary' : 'textSecondary'}
            >
              문자 + 발음
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              isCharacterMode && styles.activeButton,
              isEmpty && styles.disabledButton
            ]}
            disabled={isEmpty}
            onPress={() => handleToggleAllMode('character')}
          >
            <Text
              weight={isCharacterMode ? 700 : 500}
              variant="body2"
              color={isEmpty ? 'neutral' : isCharacterMode ? 'textPrimary' : 'textSecondary'}
            >
              문자
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              isPronunciationMode && styles.activeButton,
              isEmpty && styles.disabledButton
            ]}
            disabled={isEmpty}
            onPress={() => handleToggleAllMode('pronunciation')}
          >
            <Text
              weight={isPronunciationMode ? 700 : 500}
              variant="body2"
              color={isEmpty ? 'neutral' : isPronunciationMode ? 'textPrimary' : 'textSecondary'}
            >
              발음
            </Text>
          </Pressable>
        </View>
        {isEmpty ? (
          <EmptyState>오답 노트가 비어있어요.</EmptyState>
        ) : (
          <View style={styles.groups}>
            {groupedMistakes.map(([count, mistakes]) => (
              <Accordion
                key={count}
                title={`틀린 횟수 ${count}회`}
                suffix={
                  <View style={styles.suffix}>
                    <Text
                      weight={500}
                      variant="caption"
                      color="primary"
                    >
                      {mistakes.length}
                    </Text>
                    <Text
                      variant="caption"
                      color="textSecondary"
                    >
                      개
                    </Text>
                  </View>
                }
                maxHeight={
                  MISTAKES_PADDING_TOP +
                  mistakes.length * (MISTAKE_HEIGHT + MISTAKES_GAP) -
                  MISTAKES_GAP
                }
                defaultExpanded
              >
                <View style={styles.mistakes}>
                  {mistakes.map(mistake => (
                    <View
                      key={mistake.character}
                      style={styles.mistake}
                    >
                      <View style={styles.mistakeContent}>
                        {mistake.mode !== 'pronunciation' && (
                          <Text weight={700}>{mistake.character}</Text>
                        )}
                        {mistake.mode !== 'character' && (
                          <Text
                            weight={500}
                            color="textSecondary"
                          >
                            [{mistake.pronunciation}]
                          </Text>
                        )}
                      </View>
                      <View style={styles.mistakeControl}>
                        <Pressable
                          style={styles.iconButton}
                          onPress={() => handleToggleMode(mistake)}
                        >
                          <MaterialIcons
                            name="sync"
                            size={20}
                            color={Colors.textPrimary}
                          />
                        </Pressable>
                        <Pressable
                          style={[styles.iconButton, playing && styles.disabledIconButton]}
                          onPress={() => playKanaAudio(mistake.character)}
                          disabled={playing}
                        >
                          <MaterialIcons
                            name={playing ? 'headset-off' : 'headset'}
                            size={20}
                            color={playing ? Colors.textSecondary : Colors.textPrimary}
                          />
                        </Pressable>
                        <Link
                          href={{
                            pathname: '/practice/[kana]',
                            params: { kana: mistake.character }
                          }}
                          style={styles.iconButton}
                          onPress={playPopAudio}
                        >
                          <MaterialCommunityIcons
                            name="lead-pencil"
                            size={20}
                            color={Colors.textPrimary}
                          />
                        </Link>
                      </View>
                    </View>
                  ))}
                </View>
              </Accordion>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary10
  },
  activeButton: {
    backgroundColor: Colors.primary30
  },
  disabledButton: {
    backgroundColor: Colors.neutralLight
  },
  groups: {
    gap: 16
  },
  suffix: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mistakes: {
    paddingTop: MISTAKES_PADDING_TOP,
    gap: MISTAKES_GAP
  },
  mistake: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    minHeight: MISTAKE_HEIGHT,
    padding: 8,
    borderRadius: 26,
    backgroundColor: Colors.primary10
  },
  mistakeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 16
  },
  mistakeControl: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 8,
    borderRadius: '50%',
    backgroundColor: Colors.primary30
  },
  disabledIconButton: {
    backgroundColor: Colors.primary10
  }
});

export default MistakeScene;
