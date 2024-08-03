import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {ReactNode} from 'react';
import useTheme from '../../providers/theme-provider';
import {COLORS, SIZES} from '../../constants/default-theme';

type ContainerProps = {
  children?: ReactNode;
};

export const Container = ({children}: ContainerProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: COLORS[theme].background,
    },
    content: {
      maxWidth: SIZES.width,
    },
    maxSize: {
      height: '100%',
      width: '100%',
    },
  });

  return (
    <View style={[styles.maxSize, styles.container]}>
      <SafeAreaView style={[styles.maxSize, styles.content]}>{children}</SafeAreaView>
    </View>
  );
};
