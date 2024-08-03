import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {Icon, IconNameType} from '../icon';
import useTheme from '../../providers/theme-provider';
import {COLORS, FONTS, SIZES} from '../../constants/default-theme';

type DateSelectProps = {
  error?: boolean;
  value?: string;
  placeholder?: string;
  onChangeValue?: (value: string) => unknown;
  icon?: IconNameType;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
};

const defaultMaxDate = dayjs().add(10, 'year').endOf('day').format('YYYY-MM-DD HH:mm:ss');
const defaultMinDate = dayjs().subtract(10, 'year').startOf('day').format('YYYY-MM-DD HH:mm:ss');

export const DateSelect = ({
  onChangeValue,
  error,
  value,
  icon,
  placeholder = 'Selecione uma data',
  minDate = defaultMinDate,
  maxDate = defaultMaxDate,
  disabled,
}: DateSelectProps) => {
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
    onChangeValue && onChangeValue(dayjs(value).format('YYYY-MM-DD'));
    closePicker();
  };

  return (
    <>
      <DatePicker
        modal
        title="Selecione a data"
        confirmText="Confirmar"
        cancelText="Cancelar"
        open={open}
        date={getDateValue(value)}
        locale="pt-br"
        theme="light"
        onConfirm={handleChangeValue}
        onCancel={closePicker}
        minimumDate={getDateValue(minDate)}
        maximumDate={getDateValue(maxDate)}
        mode="date"
      />

      <TouchableOpacity disabled={disabled} activeOpacity={0.6} style={styles.container} onPress={() => setOpen(true)}>
        {icon && <Icon color={COLORS[theme].textVariant} name={icon} size={22} />}
        <View style={styles.descriptionContainer}>
          {value && dayjs(value).isValid() ? (
            <Text numberOfLines={1} style={styles.text}>
              {dayjs(value).format('DD/MM/YYYY')}
            </Text>
          ) : (
            <Text numberOfLines={1} style={styles.placeholder}>
              {placeholder}
            </Text>
          )}
        </View>
        <Icon color={COLORS[theme].textVariant} name="Calendar" size={22} />
      </TouchableOpacity>
    </>
  );
};

const getDateValue = (dateString: string | undefined): Date => {
  if (dayjs(dateString).isValid()) {
    return new Date(dayjs(dateString).format('YYYY-MM-DD HH:mm:ss'));
  }
  return new Date();
};
