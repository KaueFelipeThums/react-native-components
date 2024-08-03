import React, {ReactNode, forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {
  Text,
  View,
  BackHandler,
  Keyboard,
  Platform,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Easing,
  KeyboardAvoidingView,
  DimensionValue,
  StyleSheet,
} from 'react-native';
import {Divider} from '../divider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Portal} from 'react-native-portalize';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import useTheme from '../../providers/theme-provider';
import {Button} from '../buttons';

type BottomSheetProps = {
  children?: ReactNode;
  title?: string;
  height?: DimensionValue;
};

export type BottomSheetHandle = {
  open: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(({children, title, height}, ref) => {
  const {theme} = useTheme();

  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<boolean>(false);
  const [opacity] = useState(new Animated.Value(0));
  const [container] = useState(new Animated.Value(SIZES.height));
  const [modal] = useState(new Animated.Value(SIZES.height));

  const styles = StyleSheet.create({
    modalHeader: {
      padding: SIZES.padding,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      color: COLORS[theme].text,
      ...FONTS.h3,
    },
    flex: {
      flex: 1,
    },
    container: {
      zIndex: 10,
      width: '100%',
      height: '100%',
      backgroundColor: '#00000080',
      position: 'absolute',
      paddingTop: Platform.OS === 'ios' ? insets.top : 0,
    },
    modal: {
      bottom: 0,
      zIndex: 10,
      position: 'absolute',
      height: height ?? '60%',
      backgroundColor: COLORS[theme].background,
      width: '100%',
      borderTopLeftRadius: SIZES.radius,
      borderTopRightRadius: SIZES.radius,
      paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
    },
    maxSize: {
      height: '100%',
      width: '100%',
    },
  });

  useEffect(() => {
    const backAction = () => {
      closeModal();
      return open ? true : false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [open]);

  const openModal = () => {
    setOpen(true);
    Keyboard.dismiss();

    Animated.parallel([
      Animated.timing(container, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      }),
      Animated.timing(opacity, {toValue: 1, duration: 200, useNativeDriver: true}),
      Animated.spring(modal, {
        toValue: 0,
        bounciness: 0,
        speed: 25,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    setOpen(false);
    Keyboard.dismiss();
    Animated.sequence([
      Animated.parallel([
        Animated.timing(modal, {toValue: SIZES.height, duration: 250, useNativeDriver: true}),
        Animated.timing(opacity, {toValue: 0, duration: 280, useNativeDriver: true}),
      ]),
      Animated.timing(container, {toValue: SIZES.height, duration: 1, useNativeDriver: true}),
    ]).start();
  };

  useImperativeHandle(ref, () => ({
    open: () => openModal(),
    close: () => closeModal(),
  }));

  const handleBackdropPress = () => {
    closeModal();
  };

  return (
    <Portal>
      <Animated.View style={[styles.container, {opacity: opacity, transform: [{translateY: container}]}]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-insets.bottom}
          style={styles.maxSize}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableOpacity style={styles.flex} activeOpacity={1} onPress={handleBackdropPress}>
            <Animated.View style={[styles.modal, {transform: [{translateY: modal}]}]}>
              <TouchableWithoutFeedback style={styles.flex}>
                <View style={styles?.flex}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.text} numberOfLines={1}>
                      {title}
                    </Text>
                    <Button.IconText
                      backgroundColor={COLORS[theme].itemBackground}
                      size={40}
                      icon="X"
                      onPress={closeModal}
                    />
                  </View>
                  <Divider marginVertical={0} />
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>
    </Portal>
  );
});

export {BottomSheet};
