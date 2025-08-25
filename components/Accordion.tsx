import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

interface AccordionProps {
  title: string;
  suffix?: ReactNode;
  children: ReactNode;
  maxHeight: number;
  defaultExpanded?: boolean;
}

const Accordion = ({ title, suffix, children, maxHeight, defaultExpanded }: AccordionProps) => {
  const { playPopAudio } = usePopAudio();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const animation = useRef(new Animated.Value(Number(defaultExpanded))).current;

  const toggle = () => {
    playPopAudio();
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
    setExpanded(!expanded);
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight]
  });

  return (
    <View>
      <Pressable
        style={styles.title}
        onPress={toggle}
      >
        <View style={styles.titleText}>
          <Text
            weight={700}
            variant="body2"
          >
            {title}
          </Text>
          {suffix}
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.textPrimary}
        />
      </Pressable>
      <Animated.View
        style={[
          styles.content,
          {
            height
          }
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  titleText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4
  },
  content: {
    overflow: 'hidden'
  }
});

export default Accordion;
