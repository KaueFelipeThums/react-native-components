import {Switch} from 'react-native';
import useTheme from '../../providers/theme-provider';
import {COLORS} from '../../constants/default-theme';

type SwitchInputProps = {
  onChange: (value: boolean) => void | Promise<void>;
  value: boolean;
  disabled?: boolean;
};

export const SwitchInput = ({onChange, value, disabled = false}: SwitchInputProps) => {
  const {theme} = useTheme();

  return (
    <Switch
      trackColor={{false: COLORS[theme].grayLight, true: COLORS[theme].greenLight}}
      thumbColor={value ? COLORS[theme].primary : COLORS[theme].gray}
      onValueChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
};
