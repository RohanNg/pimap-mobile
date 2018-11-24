import * as React from 'react'
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

export default class ResponeItem extends React.Component {
  public render() {
    return (
      <View style={styles.content}>
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 7,
          }}
          source={require('../../assets/activity_image/unocard.jpg')}
        />
        <View style={styles.card}>
          <Text style={styles.text}>
            Your request to join Boardgame Uno is accepted
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E5E5E5',
    height: 80,
    width: 200,
    borderRadius: 7,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
})
