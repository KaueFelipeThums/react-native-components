import React from 'react';
import Toast from 'react-native-toast-message';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import useTheme from '../../providers/theme-provider';
import {Icon} from '../icon';

type ToastConfigType = {
  text1?: string;
  text2?: string;
  props?: any;
  isVisible?: boolean;
};

const MessageRoot = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].itemBackground,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      // SHADOW
      elevation: 10,
      shadowColor: COLORS[theme].shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      borderRadius: SIZES.radius,
      padding: 6,
      marginHorizontal: 20,
    },
    text: {
      fontWeight: '500',
      paddingHorizontal: 10,
      flexShrink: 1,
      ...FONTS.body4,
      color: COLORS[theme].text,
    },
    iconContainer: {
      padding: 5,
      borderRadius: 9,
    },
  });

  const toastConfig = {
    success: ({text1, text2, props, isVisible}: ToastConfigType) =>
      isVisible && (
        <View style={styles.container}>
          <View style={[styles.iconContainer, {backgroundColor: COLORS[theme].greenLight}]}>
            <Icon size={22} name="CircleCheck" color={COLORS[theme].green} />
          </View>
          <Text style={styles.text}>{text1}</Text>
        </View>
      ),
    error: ({text1, text2, props, isVisible}: ToastConfigType) =>
      isVisible && (
        <View style={styles.container}>
          <View style={[styles.iconContainer, {backgroundColor: COLORS[theme].redLight}]}>
            <Icon size={22} name="CircleX" color={COLORS[theme].red} />
          </View>
          <Text style={styles.text}>{text1}</Text>
        </View>
      ),
    warning: ({text1, text2, props, isVisible}: ToastConfigType) =>
      isVisible && (
        <View style={styles.container}>
          <View style={[styles.iconContainer, {backgroundColor: COLORS[theme].orangeLight}]}>
            <Icon size={22} name="TriangleAlert" color={COLORS[theme].orange} />
          </View>
          <Text style={styles.text}>{text1}</Text>
        </View>
      ),
  };

  return <Toast config={toastConfig} />;
};

const message = (type: 'warning' | 'error' | 'success', text1?: string) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: '',
    onPress: () => Toast.hide(),
  });
};

export {MessageRoot, message};
