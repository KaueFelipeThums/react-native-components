import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';
import {Icon, IconNameType} from '../icon/icon';

type InputPasswordProps = TextInputProps & {
  disabled?: boolean;
  error?: boolean;
  icon?: IconNameType;
  onFocus?: () => unknown;
  onBlur?: () => unknown;
  numberOfLines?: number;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
};

const InputPassword = forwardRef<TextInput, InputPasswordProps>(
  ({disabled = false, error = false, icon, onFocus, onBlur, numberOfLines, maxHeight, minHeight, ...props}, ref) => {
    const {theme} = useTheme();
    const [focus, setFocus] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
        padding: 1,
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
              secureTextEntry={!showPassword}
              onFocus={handleGetFocus}
              onBlur={handleLostFocus}
              {...props}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{padding: 8}}
            disabled={disabled}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'Eye' : 'EyeOff'} color={COLORS[theme].textVariant} size={22} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export {InputPassword};
