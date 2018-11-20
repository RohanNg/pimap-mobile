import * as React from 'react'
import { Card, Paragraph, Title } from 'react-native-paper'
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

export default class ReviewItem extends React.Component {
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
            source={require('../componentresources/nooke.jpg')}
          />
          <Paragraph style={styles.name}>Nooke Parviainen</Paragraph>
        </Card.Content>
        <Text style={styles.reviewcomment}>Left a review for you</Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E5E5E5',
    height: 80,
    width: 280,
    marginTop: 20,
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
  reviewcomment: {
    marginBottom: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
  },
})
