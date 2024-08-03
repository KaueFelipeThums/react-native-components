import React from 'react';
import {TouchableOpacity, ActivityIndicator, DimensionValue, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon/icon';

type ButtonIconTextProps = {
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  size?: DimensionValue;
  color?: string;
  fontSize?: number;
  onPress?: () => unknown;
  iconSize?: number;
  icon: IconNameType;
};

const ButtonIconText = ({
  loading = false,
  disabled = false,
  backgroundColor,
  size,
  style,
  color,
  onPress,
  iconSize,
  icon,
}: ButtonIconTextProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor ?? 'transparent',
      width: size ?? 55,
      height: size ?? 55,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: SIZES.radius,
      opacity: disabled || loading ? 0.5 : 1,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled || loading}
      onPress={onPress}
      style={[styles.button, style]}>
      {loading ? (
        <ActivityIndicator size={iconSize ?? 22} color={color ?? COLORS[theme].text} />
      ) : (
        <Icon color={color ?? COLORS[theme].text} name={icon} size={iconSize ?? 24} />
      )}
    </TouchableOpacity>
  );
};

export {ButtonIconText};
