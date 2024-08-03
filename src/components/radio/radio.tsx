import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon} from '../icon';

type OptionsItem = {
  value: number | string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type RadioProps = {
  disabled?: boolean;
  options?: OptionsItem[];
  value?: number | string | null;
  onChange: (value: number | string) => unknown;
};

const Radio = ({options = [], disabled = false, value, onChange}: RadioProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: 5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
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
    <View style={styles.container}>
      {options?.map(option => {
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={disabled || option.disabled}
            key={option?.value.toString()}
            style={[styles.content, value === option.value && styles.marked]}
            onPress={() => onChange(option.value)}>
            <Icon
              size={22}
              color={value === option.value ? COLORS[theme].primary : COLORS[theme].textVariant}
              name={value === option.value ? 'CircleCheckBig' : 'Circle'}
            />
            <View style={styles.descriptionContent}>
              <Text style={styles.title}>{option.label}</Text>
              {option.description && <Text style={styles.description}>{option.description}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export {Radio};
