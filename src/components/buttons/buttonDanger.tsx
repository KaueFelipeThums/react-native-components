import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon/icon';

type ButtonDangerProps = {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  onPress?: () => unknown;
  icon?: IconNameType;
  iconDirection?: 'left' | 'right';
  text?: string;
  color?: string;
  backgroundColor?: string;
};

const ButtonDanger = ({
  style,
  disabled = false,
  loading = false,
  width,
  height,
  onPress,
  icon,
  iconDirection = 'left',
  text = '',
  color,
  backgroundColor,
}: ButtonDangerProps) => {
  const {theme} = useTheme();
  const renderIcon = loading ? (
    <ActivityIndicator size={22} color={color ?? COLORS[theme].white} />
  ) : (
    icon && <Icon name={icon} size={22} color={color ?? COLORS[theme].white} />
  );

  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor ?? COLORS[theme]?.red,
      width: width ?? 'auto',
      height: height ?? 55,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SIZES.padding / 2,
      paddingHorizontal: SIZES.padding,
      opacity: disabled || loading ? 0.5 : 1,
    },
    content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      color: color ?? COLORS[theme].white,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled || loading}
      onPress={onPress}
      style={[styles.button, style]}>
      <View style={styles.content}>
        {iconDirection === 'left' && renderIcon}
        <Text style={[FONTS.h3, styles.text]}>{text}</Text>
        {iconDirection === 'right' && renderIcon}
      </View>
    </TouchableOpacity>
  );
};

export {ButtonDanger};
