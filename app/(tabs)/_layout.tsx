import DefaultHeader from '@/components/DefaultHeader';
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
        tabBarInactiveTintColor: Colors.textSecondary,
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
          header: () => <DefaultHeader />,
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
          tabPress: () => playPopAudio()
        })}
      />
      <Tabs.Screen
        name="chart"
        options={{
          header: () => <DefaultHeader />,
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              문자 익히기
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
            navigation.navigate('chart');
          },
          focus: () => {
            setAnimationEnabled(true);
          }
        })}
      />
      <Tabs.Screen
        name="test"
        options={{
          header: () => <DefaultHeader />,
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              테스트
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Entypo
              name="flower"
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
            navigation.navigate('test');
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
          tabPress: () => playPopAudio()
        })}
      />
    </Tabs>
  );
}
