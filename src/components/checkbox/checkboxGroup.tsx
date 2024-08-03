import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox} from './checkbox.tsx';

type OptionsItem = {
  value: number | string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type CheckboxGroupProps = {
  options?: OptionsItem[];
  disabled?: boolean;
  value?: (number | string)[];
  onChange: (value: (number | string)[] | undefined) => unknown;
};

function CheckboxGroup({options = [], disabled = false, value, onChange}: CheckboxGroupProps) {
  const styles = StyleSheet.create({
    container: {
      gap: 5,
    },
  });

  const hendleCheck = (checkValue: number | string, isChecked: boolean) => {
    const newValues = [...(value ?? [])];
    const index = newValues?.indexOf(checkValue);

    if (isChecked && index === -1) {
      newValues.push(checkValue);
    }

    if (!isChecked && index !== -1) {
      newValues.splice(index, 1);
    }

    onChange && onChange(newValues);
  };

  return (
    <View style={styles.container}>
      {options?.map(option => (
        <Checkbox
          key={option?.value.toString()}
          disabled={disabled || option?.disabled}
          label={option?.label}
          description={option?.description}
          onPress={isChecked => hendleCheck(option?.value, isChecked)}
          value={!!value?.includes(option.value)}
        />
      ))}
    </View>
  );
}

export {CheckboxGroup};
