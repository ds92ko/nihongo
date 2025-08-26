import { mateImageMap } from '@/assets/images/mates';
import Switch from '@/components/Switch';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { MateType, useMateActions, useMateContext } from '@/stores/useMateStore';
import { useSettingActions, useSettingContext } from '@/stores/useSettingStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
  const { mate } = useMateContext();
  const { setMate } = useMateActions();
  const { popSoundOff, kanaSoundOff } = useSettingContext();
  const { setPopSoundOff, setKanaSoundOff } = useSettingActions();
  const { playPopAudio } = usePopAudio();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Ionicons
            name="school-outline"
            size={24}
            color={Colors.textPrimary}
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
                onPress={() => {
                  playPopAudio();
                  setMate(key);
                }}
              >
                <Image
                  source={mateImageMap[key][key === mate ? 'hi' : 'peace']}
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
            color={Colors.textPrimary}
          />
          <Text
            weight={700}
            variant="body2"
          >
            사운드
          </Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.settingItem}>
            <Text
              weight={500}
              variant="caption"
              color="textSecondary"
            >
              음성
            </Text>
            <Switch
              value={!kanaSoundOff}
              onValueChange={setKanaSoundOff}
            />
          </View>
          <View style={styles.settingItem}>
            <Text
              weight={500}
              variant="caption"
              color="textSecondary"
            >
              효과음
            </Text>
            <Switch
              value={!popSoundOff}
              onValueChange={setPopSoundOff}
            />
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={Colors.textPrimary}
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
            color={Colors.textPrimary}
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
            color={Colors.textPrimary}
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
  );
}

const styles = StyleSheet.create({
  container: {
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
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
