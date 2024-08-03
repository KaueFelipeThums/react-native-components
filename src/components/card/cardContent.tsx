import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {SIZES} from '../../constants/default-theme';

type CardContentProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardContent = ({children, style}: CardContentProps) => {
  const styles = StyleSheet.create({
    content: {
      padding: 12,
      backgroundColor: 'transparent',
      borderBottomLeftRadius: SIZES.radius,
      borderBottomRightRadius: SIZES.radius,
    },
  });

  return <View style={[styles.content, style]}>{children}</View>;
};

export {CardContent};
