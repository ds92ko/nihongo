import { mateImageMap } from '@/assets/images/mates';
import { Text } from '@/components/common';
import { Switch } from '@/components/local/setting';
import { Colors } from '@/constants/Colors';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import { useDialogActions } from '@/stores/useDialogStore';
import { MateType, useMateActions, useMateContext } from '@/stores/useMateStore';
import { useMistakeActions, useMistakeContext } from '@/stores/useMistakeStore';
import { useSettingActions, useSettingContext } from '@/stores/useSettingStore';
import { useStatsActions, useStatsContext } from '@/stores/useStatsStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 16;
const CONTAINER_PADDING = PADDING_HORIZONTAL * 2;
const CARD_PADDING = PADDING_HORIZONTAL * 2;
const MATES_GAP = 8;
const PER_ROW = 4;
const MATE_SIZE = Math.floor(
  (width - (CONTAINER_PADDING + CARD_PADDING) - MATES_GAP * (PER_ROW - 1)) / PER_ROW
);

export default function SettingScreen() {
  const { hapticFeedback } = useHaptics();
  const { mate } = useMateContext();
  const { setMate } = useMateActions();
  const { soundEffectOff, kanaSoundOff, hapticOff } = useSettingContext();
  const { toggleSoundEffect, toggleKanaSound, toggleHaptic } = useSettingActions();
  const { mistakes } = useMistakeContext();
  const { resetMistakes } = useMistakeActions();
  const { practice, quiz } = useStatsContext();
  const { resetPracticeStats, resetQuizStats } = useStatsActions();
  const { openDialog } = useDialogActions();

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
  };

  const onPressDialog = ({
    type,
    isEmpty,
    onPress
  }: {
    type: '연습 기록' | '퀴즈 기록' | '오답 노트';
    isEmpty: boolean;
    onPress: () => void;
  }) => {
    openDialog({
      variant: isEmpty ? 'info' : 'warning',
      title: `${type} 데이터${isEmpty ? '가 없어요.' : '를 초기화할까요?'}`,
      contents: isEmpty
        ? [`${type} 데이터가 존재하지 않아 초기화할 수 없어요.`]
        : [`초기화하면 ${type}의 모든 데이터가 삭제됩니다.`, '삭제된 데이터는 복구할 수 없어요.'],
      confirm: isEmpty
        ? undefined
        : {
            label: '초기화',
            onPress
          }
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Ionicons
              name="school-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              학습 메이트
            </Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.mates}>
              {(Object.keys(mateImageMap) as MateType[]).map(key => (
                <Pressable
                  key={key}
                  style={[
                    styles.mate,
                    { backgroundColor: key === mate ? Colors.primary30 : Colors.neutralLight }
                  ]}
                  onPressIn={onPressIn}
                  onPress={() => setMate(key)}
                >
                  <Image
                    source={mateImageMap[key][key === mate ? 'happy' : 'peace']}
                    style={styles.mateImage}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Ionicons
              name="volume-medium-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              사운드
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Pressable
              style={styles.settingItem}
              onPressIn={onPressIn}
              onPress={toggleKanaSound}
            >
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                음성
              </Text>
              <Switch
                value={!kanaSoundOff}
                onValueChange={toggleKanaSound}
              />
            </Pressable>
            <Pressable
              style={styles.settingItem}
              onPressIn={onPressIn}
              onPress={toggleSoundEffect}
            >
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                효과음
              </Text>
              <Switch
                value={!soundEffectOff}
                onValueChange={toggleSoundEffect}
              />
            </Pressable>
            <Pressable
              style={styles.settingItem}
              onPressIn={onPressIn}
              onPress={toggleHaptic}
            >
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                진동
              </Text>
              <Switch
                value={!hapticOff}
                onValueChange={toggleHaptic}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Ionicons
              name="server-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              데이터
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Pressable
              style={styles.settingItem}
              onPressIn={onPressIn}
              onPress={() =>
                onPressDialog({
                  type: '연습 기록',
                  isEmpty: !Object.keys(practice).length,
                  onPress: resetPracticeStats
                })
              }
            >
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                연습 기록
              </Text>
              <Ionicons
                name="trash-outline"
                size={20}
                color={Colors.textPrimary}
              />
            </Pressable>
            <Pressable
              style={styles.settingItem}
              onPressIn={onPressIn}
              onPress={() =>
                onPressDialog({
                  type: '퀴즈 기록',
                  isEmpty: !Object.keys(quiz).length,
                  onPress: resetQuizStats
                })
              }
            >
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                퀴즈 기록
              </Text>
              <Ionicons
                name="trash-outline"
                size={20}
                color={Colors.textPrimary}
              />
            </Pressable>
            <Pressable
              style={styles.settingItem}
              onPressIn={onPressIn}
              onPress={() =>
                onPressDialog({
                  type: '오답 노트',
                  isEmpty: !mistakes.hiragana.length && !mistakes.katakana.length,
                  onPress: resetMistakes
                })
              }
            >
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                오답 노트
              </Text>
              <Ionicons
                name="trash-outline"
                size={20}
                color={Colors.textPrimary}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              고객지원
            </Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                문의하기
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                공유하기
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                리뷰 남기기
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                공식 홈페이지
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              약관 및 정책
            </Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                이용약관
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                개인정보처리방침
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                라이선스
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              weight={700}
              variant="body2"
            >
              앱 정보
            </Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                버전
              </Text>
              <Text
                weight={500}
                variant="body2"
              >
                1.0.0
              </Text>
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                릴리즈 노트
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text
                weight={500}
                variant="caption"
                color="textSecondary"
              >
                크레딧
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textPrimary}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.primary10
  },
  contentContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 24,
    gap: 16
  },
  card: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    padding: PADDING_HORIZONTAL
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  cardContent: {
    paddingTop: 16,
    gap: 8
  },
  mates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: MATES_GAP
  },
  mate: {
    overflow: 'hidden',
    borderRadius: 8,
    width: MATE_SIZE,
    padding: 4,
    aspectRatio: 1
  },
  mateImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  settingItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30
  }
});
