import * as React from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

export default class RequestItem extends React.Component {
  public render() {
    return (
      <Card
        style={{
          backgroundColor: '#E5E5E5',
          height: 160,
          width: 280,
          marginTop: 30,
        }}
      >
        <Card.Content
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginLeft: 1,
            }}
            source={require('../componentresources/nooke.jpg')}
          />
          <Paragraph
            style={{
              marginLeft: 10,
              marginTop: 1,
              fontSize: 14,
              color: '#A2A2A2',
              fontWeight: '300',
            }}
          >
            Nooke Parviainen
          </Paragraph>
        </Card.Content>
        <View style={{ marginBottom: 5, paddingHorizontal: 25 }}>
          <Text style={{ fontSize: 12, color: 'black', marginTop: 5 }}>
            Sent you an invitation to event
          </Text>
          <Text style={{ fontSize: 16, color: 'black', marginTop: 5 }}>
            10 km run
          </Text>
          <Text style={{ fontSize: 10, color: 'grey', marginTop: 5 }}>
            Kilo train station - 14:00
          </Text>
          <TouchableOpacity
            style={{
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
            }}
          >
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
