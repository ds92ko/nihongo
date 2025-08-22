import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { useChartTabActions } from '@/stores/useChartTabStore';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { setTabIndex, setAnimationEnabled } = useChartTabActions();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          height: 80,
          backgroundColor: Colors.white
        },
        animation: 'shift'
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
        name="chart"
        options={{
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            setAnimationEnabled(false);
            setTabIndex(0);
            navigation.navigate('chart');
          },
          focus: () => {
            setAnimationEnabled(true);
          }
        })}
      />
    </Tabs>
  );
}
