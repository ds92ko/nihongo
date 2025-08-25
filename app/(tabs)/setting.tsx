import Switch from '@/components/Switch';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { useSettingActions, useSettingContext } from '@/stores/useSettingStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SettingScreen() {
  const { popSoundOff, kanaSoundOff } = useSettingContext();
  const { setPopSoundOff, setKanaSoundOff } = useSettingActions();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  card: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    padding: 16
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
  settingItem: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
