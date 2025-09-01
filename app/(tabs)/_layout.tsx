import { Text } from '@/components/common';
import { HomeHeader } from '@/components/local/home';
import { SettingHeader } from '@/components/local/setting';
import { Colors } from '@/constants/Colors';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import { useTabActions } from '@/stores/useTabStore';
import Entypo from '@expo/vector-icons/Entypo';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { setTabIndex, setAnimationEnabled } = useTabActions();
  const { hapticFeedback } = useHaptics();

  const onTabPress = (onPress?: () => void) => {
    hapticFeedback();
    SoundManager.playClick();
    onPress?.();
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.neutralDark,
        tabBarStyle: {
          height: 80,
          backgroundColor: Colors.white
        },
        animation: 'none'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <HomeHeader />,
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              홈
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Entypo
              name="home"
              size={24}
              color={color}
            />
          )
        }}
        listeners={() => ({
          tabPress: () => onTabPress()
        })}
      />
      <Tabs.Screen
        name="practice"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const commonOptions = {
            headerShown: false
          };

          if (routeName === '[kana]') {
            return {
              ...commonOptions,
              tabBarStyle: {
                display: 'none'
              }
            };
          }
          return {
            ...commonOptions,
            tabBarLabel: ({ color }) => (
              <Text
                variant="tiny"
                color={color}
              >
                연습
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Entypo
                name="pencil"
                size={24}
                color={color}
              />
            )
          };
        }}
        listeners={({ navigation }) => ({
          tabPress: () =>
            onTabPress(() => {
              setAnimationEnabled(false);
              setTabIndex(0);
              navigation.navigate('practice');
            }),
          focus: () => {
            setAnimationEnabled(true);
          }
        })}
      />
      <Tabs.Screen
        name="review"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const commonOptions = {
            headerShown: false
          };

          if (routeName === 'quiz') {
            return {
              ...commonOptions,
              tabBarStyle: {
                display: 'none'
              }
            };
          }
          return {
            ...commonOptions,
            tabBarLabel: ({ color }) => (
              <Text
                variant="tiny"
                color={color}
              >
                퀴즈
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Entypo
                name="open-book"
                size={24}
                color={color}
              />
            )
          };
        }}
        listeners={({ navigation }) => ({
          tabPress: () =>
            onTabPress(() => {
              setAnimationEnabled(false);
              setTabIndex(0);
              navigation.navigate('review');
            }),
          focus: () => {
            setAnimationEnabled(true);
          }
        })}
      />
      <Tabs.Screen
        name="setting"
        options={{
          header: () => <SettingHeader />,
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              설정
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Entypo
              name="cog"
              size={24}
              color={color}
            />
          )
        }}
        listeners={() => ({
          tabPress: () => onTabPress()
        })}
      />
    </Tabs>
  );
}
