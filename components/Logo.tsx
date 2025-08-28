import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { StyleSheet, Text, View } from 'react-native';

interface LogoProps {
  variant?: 'fill' | 'outline';
}

const Logo = ({ variant = 'fill' }: LogoProps) => {
  return (
    <View style={styles.logo}>
      <Text style={[styles[variant], Typography.display3, { color: Colors.textPrimary }]}>
        Nihon
      </Text>
      <Text style={[styles[variant], Typography.display3, { color: Colors.primary }]}>GO!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fill: {
    fontFamily: 'Cafe24Meongi-B'
  },
  outline: {
    fontFamily: 'Cafe24Meongi-W'
  }
});

export default Logo;
