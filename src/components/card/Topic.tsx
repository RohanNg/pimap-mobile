import * as React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native'

export default class Topic extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../componentresources/soccer.jpg')}
        style={styles.background}
        imageStyle={{ resizeMode: 'cover' }}
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
    height: 120,
    width: 160,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
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
