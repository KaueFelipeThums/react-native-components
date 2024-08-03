import React from 'react';
import {View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Icon} from '../icon';
import {COLORS} from '../../constants/default-theme';
import useTheme from '../../providers/theme-provider';

type LoadingProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
};

export const Loading = ({style}: LoadingProps) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Icon name="Hourglass" size={60} color={COLORS[theme].textVariant} />
      <ActivityIndicator color={COLORS[theme].textVariant} size={30} />
    </View>
  );
};
