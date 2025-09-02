import { QuizType } from '@/stores/useQuizStore';
import { PracticeType } from '@/stores/useStatsStore';

interface PracticeMissionProps {
  category: 'practice';
  type: PracticeType;
}

interface QuizMissionProps {
  category: 'quiz';
  type: QuizType;
}

export type MissionProps = PracticeMissionProps | QuizMissionProps;

export type MissionTitleMap<T extends string> = {
  [key in T]: (goal: number) => string;
};

export type MissionDescriptionMap<T extends string> = {
  [key in T]: string;
};
