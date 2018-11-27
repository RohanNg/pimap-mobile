import * as React from 'react'
import {
  Button,
  ImageBackground,
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Card, Paragraph, Surface, Title } from 'react-native-paper'
import { theme } from '../../theme'

export const Topic: React.SFC<{
  title: string
  image: ImageRequireSource
  onPress: () => void
}> = ({ title, image, onPress }) => {
  return (
    <Surface style={styles.surface}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={image}
          style={styles.background}
          imageStyle={styles.backgroundImageStyle}
        >
          <Title style={styles.title}>{title}</Title>
        </ImageBackground>
      </TouchableOpacity>
    </Surface>
  )
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    marginRight: 10,
    elevation: 3,
    marginBottom: 8,
    borderRadius: theme.roundness,
  },
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 160,
  },
  backgroundImageStyle: {
    borderRadius: theme.roundness,
    opacity: 0.7,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
