import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, TouchableWithoutFeedback, View} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon/icon';

type InputTextProps = TextInputProps & {
  disabled?: boolean;
  error?: boolean;
  icon?: IconNameType;
  onFocus?: () => unknown;
  onBlur?: () => unknown;
};

const InputText = forwardRef<TextInput, InputTextProps>(
  ({disabled = false, error = false, icon, onFocus, onBlur, ...props}, ref) => {
    const {theme} = useTheme();
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    const styles = StyleSheet.create({
      container: {
        height: 45,
        flexDirection: 'row',
        borderColor: error ? COLORS[theme].red : focus ? COLORS[theme].primary : COLORS[theme].grayLight,
        borderWidth: 1.5,
        paddingHorizontal: 10,
        backgroundColor: COLORS[theme].itemBackground,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        gap: 10,
      },
      inputContent: {
        flexShrink: 1,
        flexGrow: 1,
      },
      input: {
        color: COLORS[theme].text,
        padding: 0,
        height: '100%',
        ...FONTS.body4,
      },
    });

    const handleGetFocus = () => {
      setFocus(true);
      onFocus && onFocus();
    };

    const handleLostFocus = () => {
      setFocus(false);
      onBlur && onBlur();
    };

    return (
      <TouchableWithoutFeedback disabled={disabled}>
        <View style={styles.container}>
          {icon && <Icon name={icon} color={COLORS[theme].textVariant} size={22} />}
          <View style={styles.inputContent}>
            <TextInput
              contextMenuHidden={true}
              ref={inputRef}
              editable={!disabled}
              placeholderTextColor={COLORS[theme].textVariant}
              style={styles.input}
              numberOfLines={1}
              onFocus={handleGetFocus}
              onBlur={handleLostFocus}
              {...props}
            />
          </View>
          {error && <Icon name="CircleX" color={COLORS[theme].red} size={22} />}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export {InputText};
