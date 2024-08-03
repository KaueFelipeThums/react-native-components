import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/default-theme';
import useTheme from '../../providers/theme-provider';

type DividerProps = {
  height?: number;
  marginVertical?: number;
  color?: string;
  borderStyle?: 'dashed' | 'dotted' | 'solid';
};

export const Divider = ({height = 1, marginVertical, color, borderStyle = 'solid'}: DividerProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    divider: {
      width: '100%',
      borderStyle: borderStyle,
      borderWidth: height,
      marginTop: height * -1,
      borderColor: color ?? COLORS[theme].grayLight,
    },
    dividerContainer: {
      overflow: 'hidden',
      width: '100%',
      marginVertical: marginVertical ?? 5,
    },
  });

  return (
    <View style={styles?.dividerContainer}>
      <View style={styles.divider} />
    </View>
  );
};
