import {Alert} from 'react-native';

type PopConfirmProps = {
  title?: string;
  text?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => unknown;
  onConfirm?: () => unknown;
};

const popConfirm = ({
  title = 'Atenção',
  text = '',
  cancelText = 'Cancelar',
  confirmText = 'Sim',
  onCancel,
  onConfirm,
}: PopConfirmProps) => {
  Alert.alert(title, text, [
    {
      text: cancelText,
      onPress: () => onCancel && onCancel(),
    },
    {
      text: confirmText,
      onPress: () => onConfirm && onConfirm(),
    },
  ]);
};

export {popConfirm};
