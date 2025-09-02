import { PracticeType } from '@/types/practice';
import { QuizType } from '@/types/quiz';

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
