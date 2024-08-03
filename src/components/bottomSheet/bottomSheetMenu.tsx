import React, {ReactNode, useRef, useState} from 'react';
import {BottomSheet, BottomSheetHandle} from './bottomSheet';
import {DimensionValue} from 'react-native';

type BottomSheetOpenProps = {
  title?: string;
  component?: ReactNode | null;
  snapPoint?: DimensionValue;
};

type BottmSheetMenuHandle = {
  open: (options: BottomSheetOpenProps) => unknown;
  close: () => unknown;
};

const BottomSheetMenu = React.forwardRef<BottmSheetMenuHandle, unknown>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheetHandle>(null);
  const [options, setOptions] = useState<BottomSheetOpenProps>({});

  const open = ({title = 'Opções', component, snapPoint}: BottomSheetOpenProps) => {
    setOptions({title, component, snapPoint});
    bottomSheetRef?.current?.open();
  };

  const close = () => {
    setOptions(state => ({...state, title: 'Opções', component: null}));
    bottomSheetRef?.current?.close();
  };

  React.useImperativeHandle(
    ref,
    React.useCallback(
      () => ({
        open,
        close,
      }),
      [open, close],
    ),
  );

  return (
    <BottomSheet title={options.title} ref={bottomSheetRef} height={options.snapPoint}>
      {options.component ?? null}
    </BottomSheet>
  );
});
export {BottomSheetMenu};
