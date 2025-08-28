import HomeHeader from '@/components/HomeHeader';
import SettingHeader from '@/components/SettingHeader';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { useTabActions } from '@/stores/useTabStore';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { setTabIndex, setAnimationEnabled } = useTabActions();
  const { playPopAudio } = usePopAudio();

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
          tabPress: playPopAudio
        })}
      />
      <Tabs.Screen
        name="practice"
        options={{
          headerShown: false,
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
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            playPopAudio();
            setAnimationEnabled(false);
            setTabIndex(0);
            navigation.navigate('practice');
          },
          focus: () => {
            setAnimationEnabled(true);
          }
        })}
      />
      <Tabs.Screen
        name="review"
        options={{
          headerShown: false,
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
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            playPopAudio();
            setAnimationEnabled(false);
            setTabIndex(0);
            navigation.navigate('review');
          },
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
          tabPress: playPopAudio
        })}
      />
    </Tabs>
  );
}
