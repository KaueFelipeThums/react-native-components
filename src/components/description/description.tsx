import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants/default-theme';
import useTheme from '../../providers/theme-provider';

type DescriptionProps = {
  label?: string;
  text?: String;
  direction?: 'vertical' | 'horizontal';
};

const Description = ({label, text, direction}: DescriptionProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      paddingVertical: 10,
      paddingHorizontal: 15,
      minHeight: 30,
      shadowColor: COLORS[theme].shadow,
      gap: 10,
    },
    text: {
      ...FONTS.body4,
      color: COLORS[theme].text,
      textAlign: direction === 'vertical' ? 'left' : 'right',
    },
    label: {
      ...FONTS.h4,
      color: COLORS[theme].text,
      textAlign: 'left',
    },
    descriptionContent: {
      flexGrow: 1,
      flexShrink: 1,
      width: direction === 'vertical' ? '100%' : '50%',
    },
    titleContent: {
      flexGrow: 1,
      flexShrink: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContent}>
        <Text numberOfLines={2} style={styles.label}>
          {label}
        </Text>
      </View>
      <View style={styles.descriptionContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export {Description};
