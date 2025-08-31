import { styles } from '@/components/common/Accordion/styles';
import { AccordionProps } from '@/components/common/Accordion/types';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import SoundManager from '@/managers/SoundManager';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

const Accordion = ({ title, suffix, children, maxHeight, defaultExpanded }: AccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const animation = useRef(new Animated.Value(Number(defaultExpanded))).current;

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight]
  });

  const toggle = () => {
    SoundManager.playClick();
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
    setExpanded(!expanded);
  };

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

export default Accordion;
