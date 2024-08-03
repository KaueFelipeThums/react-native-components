import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {DimensionValue, StyleSheet, TextInput, TextInputProps, TouchableWithoutFeedback, View} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon/icon';

type InputTextAreaProps = TextInputProps & {
  disabled?: boolean;
  error?: boolean;
  icon?: IconNameType;
  onFocus?: () => unknown;
  onBlur?: () => unknown;
  numberOfLines?: number;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
};

const InputTextArea = forwardRef<TextInput, InputTextAreaProps>(
  ({disabled = false, error = false, icon, onFocus, onBlur, numberOfLines, maxHeight, minHeight, ...props}, ref) => {
    const {theme} = useTheme();
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        borderColor: error ? COLORS[theme].red : focus ? COLORS[theme].primary : COLORS[theme].grayLight,
        borderWidth: 1.5,
        paddingHorizontal: 10,
        backgroundColor: COLORS[theme].itemBackground,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        gap: 10,
        padding: 1,
      },
      inputContent: {
        flexShrink: 1,
        flexGrow: 1,
      },
      input: {
        color: COLORS[theme].text,
        padding: 0,
        maxHeight: maxHeight ?? 80,
        minHeight: minHeight ?? 'auto',
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
              multiline={true}
              numberOfLines={numberOfLines ?? 3}
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

export {InputTextArea};
