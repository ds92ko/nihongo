import { Accordion, Button, EmptyState, IconButton, InfoCard, Text } from '@/components/common';
import {
  MISTAKE_HEIGHT,
  MISTAKES_GAP,
  MISTAKES_PADDING_TOP,
  tips
} from '@/components/local/review/MistakeScene/constants';
import { styles } from '@/components/local/review/MistakeScene/styles';
import useKanaAudio from '@/hooks/useKanaAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import {
  Mistake,
  MistakeMode,
  useMistakeActions,
  useMistakeContext
} from '@/stores/useMistakeStore';
import { ScrollView, View } from 'react-native';

const MistakeScene = () => {
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
          <Button
            onPress={() => onToggleModes('both')}
            variant="primary10"
            disabled={isEmpty}
            active={isBothMode}
          >
            글자 + 발음
          </Button>
          <Button
            onPress={() => onToggleModes('character')}
            variant="primary10"
            disabled={isEmpty}
            active={isCharacterMode}
          >
            글자
          </Button>
          <Button
            onPress={() => onToggleModes('pronunciation')}
            variant="primary10"
            disabled={isEmpty}
            active={isPronunciationMode}
          >
            발음
          </Button>
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
