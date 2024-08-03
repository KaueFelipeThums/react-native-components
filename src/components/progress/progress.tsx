import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing, Text, DimensionValue} from 'react-native';
import {mask} from '../../functions/formaters';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';

type ProgressBarProps = {
  value: number;
  width?: DimensionValue;
  height?: DimensionValue;
  showPercent?: boolean;
  radius?: number;
  duration?: number;
};

const ProgressBar = ({value, width, height, showPercent = false, radius, duration = 350}: ProgressBarProps) => {
  const {theme} = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const widthInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const styles = StyleSheet.create({
    container: {
      width: width ?? '100%',
      height: height ?? 5,
      borderRadius: radius ?? SIZES.radius,
      backgroundColor: COLORS[theme].itemBackground,
      overflow: 'hidden',
    },
    progress: {
      backgroundColor: COLORS[theme].primary,
      height: '100%',
      borderRadius: radius ?? SIZES.radius,
      width: widthInterpolate,
    },
    content: {
      width: '100%',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      ...FONTS?.h3,
      color: COLORS[theme].text,
    },
  });

  return (
    <View style={styles.content}>
      {showPercent && <Text style={styles?.text}>{mask.money(value * 100, 0)} %</Text>}
      <View style={styles.container}>
        <Animated.View style={styles.progress} />
      </View>
    </View>
  );
};

export {ProgressBar};
