import { mateImageMap } from '@/assets/images/mates';
import { Button, ProgressBar, Text } from '@/components/common';
import { SloganBanner } from '@/components/local/home';
import { Colors } from '@/constants/Colors';
import { useMateContext } from '@/stores/useMateStore';
import { useStatsContext } from '@/stores/useStatsStore';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

dayjs.locale('ja');

const { width } = Dimensions.get('window');
const DAYS_IN_WEEK = 7;
const CONTAINER_PADDING_HORIZONTAL = 16;
const WEEKLY_PADDING = 16;
const WEEKLY_STAMP_SIZE = 26;
const WEEKDAYS_GAP = 8;
const WEEKLY_IMAGE_SIZE =
  width -
  CONTAINER_PADDING_HORIZONTAL * 2 -
  WEEKLY_PADDING -
  WEEKLY_STAMP_SIZE * DAYS_IN_WEEK -
  WEEKDAYS_GAP * (DAYS_IN_WEEK - 1);

const dailyGoal = 10;

const getWeekly = ({
  practiceDates,
  quizDates
}: {
  practiceDates: string[];
  quizDates: string[];
}) => {
  const today = dayjs();
  const pastWeek = Array.from({ length: DAYS_IN_WEEK }).map((_, i) =>
    today.subtract(DAYS_IN_WEEK - 1 - i, 'day').startOf('day')
  );

  return pastWeek.map(d => ({
    day: d.format('dd'),
    practice: practiceDates.some(x => dayjs(x).isSame(d, 'day')),
    quiz: quizDates.some(x => dayjs(x).isSame(d, 'day'))
  }));
};
const getStreak = (dates: string[]) => {
  const parsedDates = dates.map(d => dayjs(d)).sort((a, b) => b.diff(a));
  const today = dayjs();
  let streak = 0;

  for (let i = 0; i < parsedDates.length; i++) {
    const date = parsedDates[i];

    if (i === 0 && !date.isSame(today, 'day')) break;
    if (i > 0 && parsedDates[i - 1].diff(date, 'day') !== 1) break;

    streak++;
  }

  return streak;
};

const weeklyImage = [
  'mocking',
  'ok',
  'yes',
  'good',
  'happy',
  'love',
  'blushing',
  'sing',
  'excited'
];

export default function Index() {
  const { mate } = useMateContext();
  const { practice, quiz } = useStatsContext();
  const practiceDates = [...Object.keys(practice)];
  const quizDates = [...Object.keys(quiz)];
  const practiceStreak = getStreak(practiceDates);
  const quizStreak = getStreak(quizDates);
  const studyStreak = getStreak([...practiceDates, ...quizDates]);
  const weekly = getWeekly({ practiceDates, quizDates });
  const today = dayjs().format('YYYY-MM-DD');
  const todayPractice = practice[today];
  const todayQuiz = quiz[today];
  const todayReading = todayPractice?.reading.length || 0;
  const todayWriting = todayPractice?.writing.length || 0;
  const todayListening = todayPractice?.listening.length || 0;
  const todaySpeaking = todayPractice?.speaking.length || 0;
  const todayCharacter = todayQuiz?.character.length || 0;
  const todayPronunciation = todayQuiz?.pronunciation.length || 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <SloganBanner />
      <View style={styles.streaks}>
        <View style={[styles.streak, { backgroundColor: Colors.practiceLight }]}>
          <View style={styles.streakIcon}>
            <Entypo
              name="pencil"
              size={32}
              color={Colors.practice}
            />
          </View>
          <View style={styles.streakText}>
            <Text
              weight={700}
              variant="caption"
            >
              연속 연습
            </Text>
            <View style={styles.dateCount}>
              <Text
                weight={700}
                variant="h3"
                color={Colors.textPractice}
              >
                {practiceStreak}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                일
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.streak, { backgroundColor: Colors.quizLight }]}>
          <View style={styles.streakIcon}>
            <Entypo
              name="open-book"
              size={32}
              color={Colors.quiz}
            />
          </View>
          <View style={styles.streakText}>
            <Text
              weight={700}
              variant="caption"
            >
              연속 퀴즈
            </Text>
            <View style={styles.dateCount}>
              <Text
                weight={700}
                variant="h3"
                color={Colors.textQuiz}
              >
                {quizStreak}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                일
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.weekly}>
        <View style={styles.weekdays}>
          {weekly.map(({ day, practice, quiz }) => (
            <View
              key={day}
              style={styles.weekday}
            >
              <Text
                weight={700}
                variant="small"
                color={Colors.textSecondary}
              >
                {day}
              </Text>
              <View style={styles.stamp}>
                <Entypo
                  name="pencil"
                  size={18}
                  color={practice ? Colors.practice : Colors.neutralLight}
                />
              </View>
              <View style={styles.stamp}>
                <Entypo
                  name="open-book"
                  size={18}
                  color={quiz ? Colors.quiz : Colors.neutralLight}
                />
              </View>
            </View>
          ))}
        </View>
        <Image
          source={mateImageMap[mate][weeklyImage[studyStreak]]}
          style={styles.weeklyImage}
        />
      </View>
      <View style={styles.missions}>
        <View style={styles.missionsHeader}>
          <View style={styles.missionTitle}>
            <MaterialIcons
              name="assignment"
              size={20}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              오늘의 숙제
            </Text>
          </View>
          <Button
            size="small"
            active
          >
            목표 설정
          </Button>
        </View>
        <View style={styles.mission}>
          <View style={styles.missionHeader}>
            <View style={styles.missionTitle}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={16}
                color={Colors.practice}
              />
              <Text
                weight={700}
                variant="caption"
              >
                읽기 연습하기
              </Text>
            </View>
            <MaterialCommunityIcons
              name="marker-check"
              size={28}
              color={todayReading >= dailyGoal ? Colors.practice : Colors.neutralLight}
              style={styles.completeCheck}
            />
          </View>
          <View style={styles.missionBody}>
            <View style={styles.missionContent}>
              <View style={styles.missionGoal}>
                <Text
                  variant="caption"
                  color="textSecondary"
                >
                  하루 목표 가나
                </Text>
                <View style={styles.goal}>
                  <Text
                    weight={500}
                    variant="caption"
                  >
                    {dailyGoal}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                  >
                    개
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={todayReading}
                max={dailyGoal}
                height={16}
                progressColor="practice"
                barColor="practiceLight"
                text="none"
              />
            </View>
            <View style={styles.missionPercentage}>
              <Text
                weight={700}
                variant="h2"
                color={Colors.textPractice}
              >
                {parseFloat(((Math.min(todayReading, dailyGoal) / dailyGoal) * 100).toFixed(1))}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                %
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mission}>
          <View style={styles.missionHeader}>
            <View style={styles.missionTitle}>
              <MaterialCommunityIcons
                name="lead-pencil"
                size={16}
                color={Colors.practice}
              />
              <Text
                weight={700}
                variant="caption"
              >
                쓰기 연습하기
              </Text>
            </View>
            <MaterialCommunityIcons
              name="marker-check"
              size={28}
              color={todayWriting >= dailyGoal ? Colors.practice : Colors.neutralLight}
              style={styles.completeCheck}
            />
          </View>
          <View style={styles.missionBody}>
            <View style={styles.missionContent}>
              <View style={styles.missionGoal}>
                <Text
                  variant="caption"
                  color="textSecondary"
                >
                  하루 목표 가나
                </Text>
                <View style={styles.goal}>
                  <Text
                    weight={500}
                    variant="caption"
                  >
                    {dailyGoal}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                  >
                    개
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={todayWriting}
                max={dailyGoal}
                height={16}
                progressColor="practice"
                barColor="practiceLight"
                text="none"
              />
            </View>
            <View style={styles.missionPercentage}>
              <Text
                weight={700}
                variant="h2"
                color={Colors.textPractice}
              >
                {parseFloat(((Math.min(todayWriting, dailyGoal) / dailyGoal) * 100).toFixed(1))}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                %
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mission}>
          <View style={styles.missionHeader}>
            <View style={styles.missionTitle}>
              <MaterialIcons
                name="headset"
                size={16}
                color={Colors.practice}
              />
              <Text
                weight={700}
                variant="caption"
              >
                듣기 연습하기
              </Text>
            </View>
            <MaterialCommunityIcons
              name="marker-check"
              size={28}
              color={todayListening >= dailyGoal ? Colors.practice : Colors.neutralLight}
              style={styles.completeCheck}
            />
          </View>
          <View style={styles.missionBody}>
            <View style={styles.missionContent}>
              <View style={styles.missionGoal}>
                <Text
                  variant="caption"
                  color="textSecondary"
                >
                  하루 목표 가나
                </Text>
                <View style={styles.goal}>
                  <Text
                    weight={500}
                    variant="caption"
                  >
                    {dailyGoal}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                  >
                    개
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={todayListening}
                max={dailyGoal}
                height={16}
                progressColor="practice"
                barColor="practiceLight"
                text="none"
              />
            </View>
            <View style={styles.missionPercentage}>
              <Text
                weight={700}
                variant="h2"
                color={Colors.textPractice}
              >
                {parseFloat(((Math.min(todayListening, dailyGoal) / dailyGoal) * 100).toFixed(1))}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                %
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mission}>
          <View style={styles.missionHeader}>
            <View style={styles.missionTitle}>
              <MaterialIcons
                name="mic"
                size={16}
                color={Colors.practice}
              />
              <Text
                weight={700}
                variant="caption"
              >
                말하기 연습하기
              </Text>
            </View>
            <MaterialCommunityIcons
              name="marker-check"
              size={28}
              color={todaySpeaking >= dailyGoal ? Colors.practice : Colors.neutralLight}
              style={styles.completeCheck}
            />
          </View>
          <View style={styles.missionBody}>
            <View style={styles.missionContent}>
              <View style={styles.missionGoal}>
                <Text
                  variant="caption"
                  color="textSecondary"
                >
                  하루 목표 가나
                </Text>
                <View style={styles.goal}>
                  <Text
                    weight={500}
                    variant="caption"
                  >
                    {dailyGoal}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                  >
                    개
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={todaySpeaking}
                max={dailyGoal}
                height={16}
                progressColor="practice"
                barColor="practiceLight"
                text="none"
              />
            </View>
            <View style={styles.missionPercentage}>
              <Text
                weight={700}
                variant="h2"
                color={Colors.textPractice}
              >
                {parseFloat(((Math.min(todaySpeaking, dailyGoal) / dailyGoal) * 100).toFixed(1))}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                %
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mission}>
          <View style={styles.missionHeader}>
            <View style={styles.missionTitle}>
              <MaterialCommunityIcons
                name="syllabary-hiragana"
                size={16}
                color={Colors.quiz}
              />
              <Text
                weight={700}
                variant="caption"
              >
                읽기 퀴즈풀기
              </Text>
            </View>
            <MaterialCommunityIcons
              name="marker-check"
              size={28}
              color={todayCharacter >= dailyGoal ? Colors.quiz : Colors.neutralLight}
              style={styles.completeCheck}
            />
          </View>
          <View style={styles.missionBody}>
            <View style={styles.missionContent}>
              <View style={styles.missionGoal}>
                <Text
                  variant="caption"
                  color="textSecondary"
                >
                  하루 목표 가나
                </Text>
                <View style={styles.goal}>
                  <Text
                    weight={500}
                    variant="caption"
                  >
                    {dailyGoal}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                  >
                    개
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={todayCharacter}
                max={dailyGoal}
                height={16}
                progressColor="quiz"
                barColor="quizLight"
                text="none"
              />
            </View>
            <View style={styles.missionPercentage}>
              <Text
                weight={700}
                variant="h2"
                color={Colors.textQuiz}
              >
                {parseFloat(((Math.min(todayCharacter, dailyGoal) / dailyGoal) * 100).toFixed(1))}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                %
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mission}>
          <View style={styles.missionHeader}>
            <View style={styles.missionTitle}>
              <MaterialCommunityIcons
                name="spellcheck"
                size={16}
                color={Colors.quiz}
              />
              <Text
                weight={700}
                variant="caption"
              >
                표기 퀴즈풀기
              </Text>
            </View>
            <MaterialCommunityIcons
              name="marker-check"
              size={28}
              color={todayPronunciation >= dailyGoal ? Colors.quiz : Colors.neutralLight}
              style={styles.completeCheck}
            />
          </View>
          <View style={styles.missionBody}>
            <View style={styles.missionContent}>
              <View style={styles.missionGoal}>
                <Text
                  variant="caption"
                  color="textSecondary"
                >
                  하루 목표 가나
                </Text>
                <View style={styles.goal}>
                  <Text
                    weight={500}
                    variant="caption"
                  >
                    {dailyGoal}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                  >
                    개
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={todayPronunciation}
                max={dailyGoal}
                height={16}
                progressColor="quiz"
                barColor="quizLight"
                text="none"
              />
            </View>
            <View style={styles.missionPercentage}>
              <Text
                weight={700}
                variant="h2"
                color={Colors.textQuiz}
              >
                {parseFloat(
                  ((Math.min(todayPronunciation, dailyGoal) / dailyGoal) * 100).toFixed(1)
                )}
              </Text>
              <Text
                weight={500}
                variant="caption"
                style={styles.unit}
                color={Colors.textSecondary}
              >
                %
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  contentContainer: {
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: 24,
    gap: 16
  },
  streaks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  streak: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    gap: 12
  },
  streakIcon: {
    backgroundColor: Colors.white,
    borderRadius: '50%',
    padding: 10
  },
  streakText: {
    gap: 2,
    alignItems: 'flex-end'
  },
  dateCount: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 2
  },
  unit: {
    marginBottom: 4
  },
  weekly: {
    position: 'relative',
    borderRadius: 8,
    padding: WEEKLY_PADDING,
    gap: 12,
    backgroundColor: Colors.infoLight
  },
  weekdays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WEEKDAYS_GAP
  },
  weekday: {
    alignItems: 'center',
    gap: WEEKDAYS_GAP
  },
  weeklyImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: WEEKLY_IMAGE_SIZE,
    height: WEEKLY_IMAGE_SIZE,
    zIndex: 10
  },
  stamp: {
    width: WEEKLY_STAMP_SIZE,
    height: WEEKLY_STAMP_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.white
  },
  missions: {
    padding: 16,
    backgroundColor: Colors.primary10,
    borderRadius: 8,
    gap: 12
  },
  missionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  mission: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    gap: 8
  },
  missionHeader: {
    position: 'relative'
  },
  missionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  completeCheck: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  missionBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8
  },
  missionContent: {
    flex: 1,
    gap: 8
  },
  missionGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  goal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  missionPercentage: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 2,
    minWidth: 75
  },
  missionComplete: { opacity: 0.5 }
});
