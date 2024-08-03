import React from 'react';
import {View, Text, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS} from '../../constants/default-theme';
import {Icon} from '../icon';

type EmptyProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
};

export const Empty = ({text = 'Sem dados!', style}: EmptyProps) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Icon name="FolderOpen" size={60} color={COLORS[theme].grayLight} />
      <Text style={{...FONTS.h3, color: COLORS[theme].textVariant}}>{text}</Text>
    </View>
  );
};
