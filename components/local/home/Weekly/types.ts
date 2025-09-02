interface WeeklyItem {
  day: string;
  practice: boolean;
  quiz: boolean;
}

interface WeeklyData {
  weekly: WeeklyItem[];
  streak: number;
}

export type GetWeekly = ({
  practiceDates,
  quizDates
}: {
  practiceDates: string[];
  quizDates: string[];
}) => WeeklyData;
