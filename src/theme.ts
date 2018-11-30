import {
  DefaultTheme,
  Provider as PaperProvider,
  ThemeShape,
} from 'react-native-paper'

interface ExtraTheme {
  spacing: {
    atomic: number
    tiny: number
    tight: number
    cozy: number
    spacious: number
    extravagant: number
  }
}

export const theme: ThemeShape & ExtraTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F27979',
  },
  spacing: {
    atomic: 4,
    tiny: 8,
    tight: 16,
    cozy: 24,
    spacious: 32,
    extravagant: 64,
  },
}
