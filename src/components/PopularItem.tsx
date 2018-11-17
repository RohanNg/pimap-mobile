import * as React from 'react'
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper'

export default class PopularItem extends React.Component {
  render() {
    return (
      <Card
        style={{
          flex: 1,
          height: 150,
          width: 230,
          margin: 8,
          borderWidth: 0.5,
          borderColor: 'white',
        }}
      >
        <Card.Cover
          style={{
            height: 90,
            width: 230,
          }}
          source={require('../resources/C1.jpg')}
        />
        <Card.Content>
          <Paragraph style={{ justifyContent: 'center', fontSize: 10 }}>
            Hai Dang Nguyen
          </Paragraph>
          <Title style={{ fontSize: 12, fontWeight: '600' }}>
            Champion League: Barca vs PSG
          </Title>
        </Card.Content>
      </Card>
    )
  }
}
