# Projeto Modelo

Projeto modelo com componentes padrão criados e configurados

## Instalação de Dependências

### Icones:

Pacotes para utilização dos icones (Lucide React):

- `yarn add react-native-svg`
- `yarn add lucide-react-native`

### Masks:

Pacotes para utilização dos formatadores (Masks):

- `yarn add intl`

### React Native Gasture Handler:

- `yarn add react-native-gesture-handler`

Adicione em `index.js` o seguinte trecho.

```javascript
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
```

### React Native Safe Area Context:

Pacote para controlar a área utilizavel em aparelhos iOS

- `yarn add react-native-safe-area-context`

### React Native Safe Area Context:

Pacote para utilização do componente BottomSheet. Possibilita que o modal fique fullscreen.

- `yarn add react-native-portalize`

Envolva o seu app com a tag `Host`.

```javascript
import {Host} from 'react-native-portalize';
```

### Date Picker:

Pacote para utilização do componente Date Picker. Para utilização é necessário adicionar o pacote `dayjs`.

- `yarn add react-native-date-picker`

### Dayjs:

Pacote para formatação e conversão de datas.

- `yarn add dayjs`

### Toast:

Pacote para utilização do Toast.

- `yarn add react-native-toast-message`

### File Picker:

Pacote para utilização do File Picker.

- `yarn react-native-document-picker`
