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
        source={require('../resources/soccer.jpg')}
        style={{
          flex: 1,
          height: 120,
          width: 160,
          margin: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>
            Football
          </Text>
        </View>
      </ImageBackground>
    )
  }
}
