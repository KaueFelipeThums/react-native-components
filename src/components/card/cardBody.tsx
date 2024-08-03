import React, {ReactNode} from 'react';
import {TouchableOpacity, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants/default-theme';
import useTheme from '../../providers/theme-provider';

type CardBodyProps = {
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onPress?: () => unknown;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'outlined';
};

const CardBody = ({onPress, disabled, loading = false, children, style, variant = 'default'}: CardBodyProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: variant === 'default' ? COLORS[theme].itemBackground : 'transparent',
      borderRadius: SIZES.radius,
      opacity: disabled || loading ? 0.7 : 1,
    },

    shadow: {
      elevation: 8,
      shadowColor: COLORS[theme].shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
  });

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      activeOpacity={onPress ? 0.8 : 1}
      style={[styles.cardContainer, variant === 'default' && styles.shadow, style]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export {CardBody};
