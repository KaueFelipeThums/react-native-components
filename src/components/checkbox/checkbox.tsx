import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon} from '../icon';
import useTheme from '../../providers/theme-provider';

type CheckboxProps = {
  disabled?: boolean;
  value?: boolean;
  onPress: (checked: boolean) => unknown;
  label: string;
  description?: string;
};

function Checkbox({disabled = false, value = false, onPress, label, description}: CheckboxProps) {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      borderRadius: SIZES.radius,
      gap: 10,
    },
    descriptionContent: {
      flexGrow: 1,
      flexShrink: 1,
    },
    title: {
      ...FONTS.body4,
      color: COLORS[theme].text,
    },
    description: {
      ...FONTS.body5,
      color: COLORS[theme].textVariant,
    },
    marked: {
      backgroundColor: `${COLORS[theme].primary}25`,
    },
  });

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={disabled}
        style={styles.container}
        onPress={() => onPress(!value)}>
        <Icon
          size={24}
          color={value ? (disabled ? `${COLORS[theme].primary}90` : COLORS[theme].primary) : COLORS[theme].textVariant}
          name={value ? 'SquareCheckBig' : 'Square'}
        />
        <View style={styles.descriptionContent}>
          <Text style={styles.title}>{label}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </TouchableOpacity>
    </>
  );
}

export {Checkbox};
