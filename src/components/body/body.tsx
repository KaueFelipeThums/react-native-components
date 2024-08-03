import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {ReactNode} from 'react';
import useTheme from '../../providers/theme-provider';
import {COLORS} from '../../constants/default-theme';

type BodyProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Body = ({children, style}: BodyProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    body: {
      backgroundColor: COLORS[theme].background,
      flex: 1,
    },
    maxSize: {
      height: '100%',
      width: '100%',
    },
  });

  return (
    <View style={[styles.maxSize, styles.body, style]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={47}
        style={styles.maxSize}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};
