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

export default class RequestItem extends React.Component {
  public render() {
    return (
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginLeft: 1,
            }}
            source={require('../../assets/activity_image/nooke.jpg')}
          />
          <Paragraph style={styles.name}>Nooke Parviainen</Paragraph>
        </Card.Content>
        <View style={{ marginTop: 5, marginBottom: 5, paddingHorizontal: 25 }}>
          <Text style={{ fontSize: 12, color: 'black', marginTop: 5 }}>
            Sent you an invitation to event
          </Text>
          <Text style={{ fontSize: 16, color: 'black', marginTop: 5 }}>
            10 km run
          </Text>
          <Text style={{ fontSize: 10, color: 'grey', marginTop: 5 }}>
            Kilo train station - 14:00
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
              }}
            >
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E5E5E5',
    height: 160,
    width: 280,
    marginTop: 30,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    marginLeft: 10,
    marginTop: 1,
    fontSize: 14,
    color: '#A2A2A2',
    fontWeight: '300',
  },
  button: {
    marginTop: 10,
    marginLeft: 170,
    height: 40,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#F27979',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
