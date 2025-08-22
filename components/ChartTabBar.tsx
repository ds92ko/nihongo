import KanaToggle from '@/components/KanaToggle';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { Pressable, StyleSheet, View } from 'react-native';
import { NavigationState, Route, SceneRendererProps, TabDescriptor } from 'react-native-tab-view';

interface ChartTabBarProps<T extends Route> extends SceneRendererProps {
  navigationState: NavigationState<T>;
  options: Record<string, TabDescriptor<T>> | undefined;
}

const ChartTabBar = <T extends Route>({ navigationState, jumpTo }: ChartTabBarProps<T>) => {
  const { index } = navigationState;
  const { playPopAudio } = usePopAudio();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {navigationState.routes.map((route, idx) => (
          <Pressable
            key={route.key}
            onPress={() => {
              jumpTo(route.key);
              playPopAudio();
            }}
            style={[
              styles.tab,
              {
                backgroundColor: idx === index ? Colors.white : Colors.primary10
              }
            ]}
          >
            <Text
              weight={idx === index ? 700 : 500}
              variant="body2"
              color={idx === index ? 'primary' : 'textSecondary'}
            >
              {route.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.toggleBar}>
        <KanaToggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  tabBar: {
    flexDirection: 'row',
    gap: 2
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  toggleBar: {
    marginBottom: 16
  }
});

export default ChartTabBar;
