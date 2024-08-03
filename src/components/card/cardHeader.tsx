import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

type CardHeaderProps = {
  children?: ReactNode;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardHeader = ({rightComponent, children, leftComponent, style}: CardHeaderProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 8,
      padding: 12,
    },
    extraComponents: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flexGrow: 1,
      flexShrink: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.extraComponents}>{leftComponent}</View>
      <View style={styles.content}>{children}</View>
      <View style={styles.extraComponents}>{rightComponent}</View>
    </View>
  );
};

export {CardHeader};
