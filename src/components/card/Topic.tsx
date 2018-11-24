import * as React from 'react'
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

export default class Topic extends React.Component {
  public render(): React.ReactNode {
    return (
      <ImageBackground
        source={require('../componentresources/soccer.jpg')}
        style={styles.background}
        imageStyle={{ borderRadius: 7 }}
      >
        <View style={styles.textpostion}>
          <Text style={styles.text}>Football</Text>
        </View>
      </ImageBackground>
    )
  }
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
  textpostion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
})
