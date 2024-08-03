import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {Icon, IconNameType} from '../icon';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';

type TimeSelectProps = {
  error?: boolean;
  value?: string;
  placeholder?: string;
  onChangeValue?: (value: string) => unknown;
  icon?: IconNameType;
  disabled?: boolean;
};

export const TimeSelect = ({
  onChangeValue,
  error,
  value,
  icon,
  placeholder = 'Selecione um horário',
  disabled,
}: TimeSelectProps) => {
  const {theme} = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      height: 45,
      flexDirection: 'row',
      borderColor: error ? COLORS[theme].red : COLORS[theme].grayLight,
      borderWidth: 1.5,
      paddingHorizontal: 10,
      backgroundColor: COLORS[theme].itemBackground,
      borderRadius: SIZES.radius,
      alignItems: 'center',
      gap: 10,
    },
    descriptionContainer: {
      flexShrink: 1,
      flexGrow: 1,
    },
    text: {
      ...FONTS.body4,
      color: COLORS[theme].text,
    },
    placeholder: {
      ...FONTS.body4,
      color: COLORS[theme].textVariant,
    },
  });

  const closePicker = () => {
    setOpen(false);
  };

  const handleChangeValue = (value: Date) => {
    onChangeValue && onChangeValue(dayjs(value).format('YYYY-MM-DD HH:mm:ss'));
    closePicker();
  };

  return (
    <>
      <DatePicker
        modal
        mode="time"
        title="Selecione a data"
        confirmText="Confirmar"
        cancelText="Cancelar"
        open={open}
        date={getDateValue(value)}
        locale="pt-br"
        is24hourSource="locale"
        theme="light"
        onConfirm={handleChangeValue}
        onCancel={closePicker}
      />

      <TouchableOpacity disabled={disabled} activeOpacity={0.6} style={styles.container} onPress={() => setOpen(true)}>
        {icon && <Icon color={COLORS[theme].textVariant} name={icon} size={22} />}
        <View style={styles.descriptionContainer}>
          {value && dayjs(value).isValid() ? (
            <Text numberOfLines={1} style={styles.text}>
              {dayjs(value).format('HH:mm')}
            </Text>
          ) : (
            <Text numberOfLines={1} style={styles.placeholder}>
              {placeholder}
            </Text>
          )}
        </View>
        <Icon color={COLORS[theme].textVariant} name="Clock" size={22} />
      </TouchableOpacity>
    </>
  );
};

const getDateValue = (dateString: string | undefined): Date => {
  if (dayjs(dateString).isValid()) {
    return new Date(dayjs(dateString).toString());
  }
  return new Date();
};
