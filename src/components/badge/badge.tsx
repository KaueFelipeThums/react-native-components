import React, {ReactNode, useEffect, useRef} from 'react';
import {View, Text, Animated, DimensionValue, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS} from '../../constants/default-theme';

type BadgeProps = {
  count?: number;
  children?: ReactNode;
  fontSize?: number;
  placement?: 'left' | 'right';
  position?: DimensionValue;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

const Badge = ({count = 0, children, fontSize, placement, position, containerStyle, style}: BadgeProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontWeight: '700',
      color: COLORS[theme].white,
      fontSize: fontSize ?? 10,
    },
    badge: {
      backgroundColor: COLORS[theme].red,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: COLORS[theme].white,
      position: children ? 'absolute' : 'relative',
      top: !children ? 'auto' : position ?? -7,
      [placement ?? 'right']: !children ? 'auto' : position ?? -7,
      zIndex: 10,
      minHeight: 23,
      minWidth: 23,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 5,
    },
  });

  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (count > 0) {
      Animated.spring(scaleValue, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [count, scaleValue]);

  const animatedStyle = {
    transform: [{scale: scaleValue}],
  };

  return (
    <View style={containerStyle}>
      {count > 0 && (
        <Animated.View style={[styles.badge, animatedStyle, style]}>
          <Text style={styles.text}>{count >= 100 ? '99+' : count}</Text>
        </Animated.View>
      )}

      {children}
    </View>
  );
};

export {Badge};
