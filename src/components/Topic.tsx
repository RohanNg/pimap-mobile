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
  public render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#ffffff',
        }}
      >
        <View style={{ flex: 2 }}>
          <ImageBackground
            source={require('../resources/football.jpg')}
            style={{ flex: 1, height: 120, width: 120, borderRadius: 15 }}
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
        </View>
      </View>
    )
  }
}
