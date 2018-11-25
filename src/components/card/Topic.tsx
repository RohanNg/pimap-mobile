import * as React from 'react'
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageRequireSource,
  View,
} from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import { theme } from '../../theme'

export const Topic: React.SFC<{
  title: string
  image: ImageRequireSource
}> = ({ title, image }) => {
  return (
    <ImageBackground
      source={image}
      style={styles.background}
      imageStyle={styles.backgroundImageStyle}
    >
      <Title style={styles.title}>{title}</Title>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: 120,
    width: 160,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
