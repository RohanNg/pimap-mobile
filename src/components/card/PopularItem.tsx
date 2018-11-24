import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Card, Paragraph, Text, Title } from 'react-native-paper'

export default class PopularItem extends React.Component {
  public render() {
    return (
      <Card style={styles.card}>
        <Card.Cover
          style={{
            height: 90,
            width: 230,
          }}
          source={require('../componentresources/C1.jpg')}
        />
        <Card.Content>
          <Paragraph style={styles.name}>Hai Dang Nguyen</Paragraph>
          <Title style={styles.title}>Champion League: Barca vs PSG</Title>
        </Card.Content>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
    width: 230,
    margin: 5,
    borderWidth: 0.5,
    borderColor: 'white',
  },

  name: {
    justifyContent: 'center',
    fontSize: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
  },
})
