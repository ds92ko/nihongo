import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          height: 80,
          backgroundColor: Colors.white
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
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
      />
      <Tabs.Screen
        name="[chart]"
        options={{
          href: {
            pathname: '/[chart]',
            params: {
              chart: 'basic'
            }
          },
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              카나 익히기
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
      />
    </Tabs>
  );
}
