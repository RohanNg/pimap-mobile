import * as React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native'
export default class Item extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          margin: 8,
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={require('../componentresources/aurora.jpg')}
            style={{ flex: 1, height: 130, width: 130, resizeMode: 'cover' }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            Aurora Watcher
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ fontSize: 7, color: 'white', alignItems: 'center' }}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
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
  },
})
