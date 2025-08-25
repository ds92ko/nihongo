import ProgressBar from '@/components/ProgressBar';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { Progress, useStudyActions, useStudyContext } from '@/stores/useStudyStore';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const ANSWERS_LENGTH = 5;

export default function StudyScreen() {
  const { kanaType } = useKanaContext();
  const { type, progress } = useStudyContext();
  const { setProgress } = useStudyActions();
  const { playPopAudio } = usePopAudio();

  const getQuestion = (progress: Progress[]) => {
    const unsolved = progress.filter(p => !p.answer);
    if (!unsolved.length) return null;

    const random = Math.floor(Math.random() * unsolved.length);
    const current = unsolved[random];

    const rows = KANA_TABS[kanaType]
      .find(tab => tab.rows.find(row => row.kana.includes(current?.character)))
      ?.rows.map(({ kana }) => kana.filter(Boolean));

    if (!rows) return null;

    const rowIndex = rows.findIndex(kana => kana.includes(current?.character));
    const currentRow = [...rows[rowIndex]];
    const answers = currentRow.map(answer =>
      type === 'character' ? KANA_TO_ROMAJI[kanaType][answer] : answer
    );

    if (answers.length < ANSWERS_LENGTH) {
      const otherRows = rows.filter((_, i) => i !== rowIndex).flat();
      const remaining = ANSWERS_LENGTH - answers.length;
      const otherAnswers = [...otherRows]
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining)
        .map(answer => (type === 'character' ? KANA_TO_ROMAJI[kanaType][answer] : answer));

      answers.push(...otherAnswers);
    }

    answers.sort(() => 0.5 - Math.random());

    return unsolved.length ? { ...current, answers } : null;
  };

  const [question, setQuestion] = useState(() => getQuestion(progress));
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  if (!question) return null;

  const correctAnswer = type === 'character' ? question.pronunciation : question.character;

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    playPopAudio();
    setSelectedAnswer(answer);

    const newProgress = progress.map(p =>
      p.character === question.character ? { ...p, answer } : p
    );
    setProgress(newProgress);

    setTimeout(() => {
      setQuestion(getQuestion(newProgress));
      setSelectedAnswer('');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress.filter(p => p.answer).length}
        max={progress.length}
      />
      <Text
        weight={700}
        variant="h1"
        style={styles.question}
      >
        {type === 'character' ? question.character : `[${question.pronunciation}]`}
      </Text>
      <View style={styles.answers}>
        {question.answers?.map(answer => {
          const isCorrect = selectedAnswer && answer === correctAnswer;
          const isIncorrect = answer === selectedAnswer && answer !== correctAnswer;

          return (
            <Pressable
              key={answer}
              style={[styles.answer, isCorrect && styles.correct, isIncorrect && styles.incorrect]}
              onPress={() => handleAnswer(answer)}
            >
              <Text
                weight={isCorrect || isIncorrect ? 700 : 500}
                variant="body2"
                color={isCorrect || isIncorrect ? 'white' : 'textSecondary'}
              >
                {type === 'pronunciation' ? answer : `[${answer}]`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  question: {
    textAlign: 'center'
  },
  answers: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  answer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 27,
    textAlign: 'center',
    backgroundColor: Colors.primary10
  },
  correct: {
    backgroundColor: Colors.success
  },
  incorrect: {
    backgroundColor: Colors.error
  }
});
