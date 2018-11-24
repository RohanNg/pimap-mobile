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
          margin: 4,
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={require('../componentresources/aurora.jpg')}
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            Aurora Watcher
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ fontSize: 7, color: 'white', textAlign: 'center' }}>
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
    marginBottom: 17,
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
  image: {
    flex: 1,
    height: 130,
    width: 130,
    resizeMode: 'cover',
    borderRadius: 7,
  },
})
