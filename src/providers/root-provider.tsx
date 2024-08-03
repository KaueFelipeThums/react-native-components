import {ReactNode} from 'react';
import {ThemeProvider} from './theme-provider';
import {Host} from 'react-native-portalize';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MessageRoot} from '../components/message';

type ComponentsRootProviderProps = {
  children: ReactNode;
};

const ComponentsRootProvider = ({children}: ComponentsRootProviderProps) => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Host>{children}</Host>
        <MessageRoot />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default ComponentsRootProvider;
