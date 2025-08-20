import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="hiragana"
        options={{
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              히라가나
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="syllabary-hiragana"
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="katakana"
        options={{
          tabBarLabel: ({ color }) => (
            <Text
              variant="tiny"
              color={color}
            >
              가타카나
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="syllabary-katakana"
              size={24}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
