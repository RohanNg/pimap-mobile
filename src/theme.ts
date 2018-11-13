import {
  DefaultTheme,
  Provider as PaperProvider,
  ThemeShape,
} from 'react-native-paper'

export const theme: ThemeShape = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F27979',
  },
}
