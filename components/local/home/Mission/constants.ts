import { MissionDescriptionMap, MissionTitleMap } from '@/components/local/home/Mission/types';
import { QuizType } from '@/stores/useQuizStore';
import { PracticeType } from '@/stores/useStatsStore';

export const PRACTICE_MISSION_TITLE_MAP: MissionTitleMap<PracticeType> = {
  reading: goal => `글자 ${goal}개 읽기 연습`,
  writing: goal => `글자 ${goal}개 쓰기 연습`,
  listening: goal => `글자 ${goal}개 듣기 연습`,
  speaking: goal => `글자 ${goal}개 말하기 연습`
};

export const QUIZ_MISSION_TITLE_MAP: MissionTitleMap<QuizType> = {
  character: goal => `글자 퀴즈 정답 ${goal}`,
  pronunciation: goal => `발음 퀴즈 정답 ${goal}`
};

export const PRACTICE_MISSION_DESCRIPTION_MAP: MissionDescriptionMap<PracticeType> = {
  reading: '획순 애니메이션을 보면서 글자를 배워요.',
  writing: '캔버스에 글자를 따라 쓰며 연습해요.',
  listening: '성우의 발음을 들으면서 소리를 익혀요.',
  speaking: '발음을 녹음해서 성우의 발음과 비교해요.'
};

export const QUIZ_MISSION_DESCRIPTION_MAP: MissionDescriptionMap<QuizType> = {
  character: '글자를 보고 알맞은 발음 표기를 찾아요.',
  pronunciation: '발음 표기를 보고 알맞은 글자를 찾아요.'
};
