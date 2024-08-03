import React from 'react';
import {Text} from 'react-native';
import ComponentsRootProvider from './src/providers/root-provider';

function App(): React.JSX.Element {
  return (
    <ComponentsRootProvider>
      <Text>App</Text>
    </ComponentsRootProvider>
  );
}

export default App;
