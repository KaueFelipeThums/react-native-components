import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';

type HeaderProps = {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const Header = ({leftComponent, rightComponent, title, subtitle}: HeaderProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: SIZES.padding,
      height: 70,
      flexDirection: 'row',
      gap: 10,
    },
    centerComponent: {
      flexGrow: 1,
      flexShrink: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...FONTS.h2,
      color: COLORS[theme].text,
      textAlign: 'center',
    },
    subtitle: {
      ...FONTS.h4,
      color: COLORS[theme].textVariant,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {leftComponent}
      <View style={styles.centerComponent}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent}
    </View>
  );
};
