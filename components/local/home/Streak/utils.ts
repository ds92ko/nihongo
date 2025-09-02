import dayjs from 'dayjs';

export const getStreak = (dates: string[]) => {
  if (!dates.length) return 0;

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
