import * as React from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
export default class Item extends React.Component {
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
          <Image
            source={require('../resources/aurora.jpg')}
            style={{ flex: 1, height: 130, width: 130, resizeMode: 'cover' }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            Aurora Watcher
          </Text>
          <TouchableOpacity
            style={{
              marginBottom: 15,
              paddingTop: 8,
              paddingBottom: 8,
              marginLeft: 70,
              marginRight: 0,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: '#F27979',
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 7, color: 'white', alignItems: 'center' }}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
