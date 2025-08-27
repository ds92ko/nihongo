import KanaToggle from '@/components/KanaToggle';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationState, Route, SceneRendererProps, TabDescriptor } from 'react-native-tab-view';

interface TabBarProps<T extends Route> extends SceneRendererProps {
  navigationState: NavigationState<T>;
  options: Record<string, TabDescriptor<T>> | undefined;
}

const TabBar = <T extends Route>({ navigationState, jumpTo }: TabBarProps<T>) => {
  const { index } = navigationState;
  const { playPopAudio } = usePopAudio();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          {navigationState.routes.map((route, idx) => (
            <Pressable
              key={route.key}
              onPress={() => {
                playPopAudio();
                jumpTo(route.key);
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16
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

export default TabBar;
