import { Accordion, EmptyState, IconButton, InfoCard, Text } from '@/components/common';
import {
  MISTAKE_HEIGHT,
  MISTAKES_GAP,
  MISTAKES_PADDING_TOP,
  tips
} from '@/components/local/review/MistakeScene/constants';
import { styles } from '@/components/local/review/MistakeScene/styles';
import useHaptics from '@/hooks/useHaptic';
import useKanaAudio from '@/hooks/useKanaAudio';
import SoundManager from '@/managers/SoundManager';
import { useKanaContext } from '@/stores/useKanaStore';
import {
  Mistake,
  MistakeMode,
  useMistakeActions,
  useMistakeContext
} from '@/stores/useMistakeStore';
import { Pressable, ScrollView, View } from 'react-native';

const MistakeScene = () => {
  const { hapticFeedback } = useHaptics();
  const { kanaType } = useKanaContext();
  const { playKanaAudio, playing } = useKanaAudio();
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

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
  };

  const onToggleModes = (mode: MistakeMode) => setMistakeModes(kanaType, mode);

  const onToggleMode = ({ mode, ...mistake }: Mistake) => {
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
            onPressIn={onPressIn}
            onPress={() => onToggleModes('both')}
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
            onPressIn={onPressIn}
            onPress={() => onToggleModes('character')}
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
            onPressIn={onPressIn}
            onPress={() => onToggleModes('pronunciation')}
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
                        <IconButton
                          icon={{ type: 'material', name: 'sync' }}
                          onPress={() => onToggleMode(mistake)}
                          size="small"
                        />
                        <IconButton
                          icon={{ type: 'material', name: `headset${playing ? '-off' : ''}` }}
                          onPress={() => playKanaAudio(mistake.character)}
                          disabled={playing}
                          size="small"
                        />
                        <IconButton
                          icon={{ type: 'material-community', name: 'lead-pencil' }}
                          href={{
                            pathname: '/practice/[kana]',
                            params: { kana: mistake.character }
                          }}
                          size="small"
                        />
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

export default MistakeScene;
