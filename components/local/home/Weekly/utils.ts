import { getStreak } from '@/components/local/home/Streak/utils';
import { DAYS_IN_WEEK } from '@/components/local/home/Weekly/constants';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

export const getWeekly = ({
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

  const practiceSet = new Set(practiceDates.map(d => dayjs(d).format('YYYY-MM-DD')));
  const quizSet = new Set(quizDates.map(d => dayjs(d).format('YYYY-MM-DD')));

  const weekly = pastWeek.map(d => {
    const key = d.format('YYYY-MM-DD');
    return {
      day: d.format('dd'),
      practice: practiceSet.has(key),
      quiz: quizSet.has(key)
    };
  });

  const streak = getStreak([...practiceDates, ...quizDates]);

  return { weekly, streak };
};
