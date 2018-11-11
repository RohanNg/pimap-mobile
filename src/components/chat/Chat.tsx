import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { GiftedChat, IChatMessage, IMessage } from 'react-native-gifted-chat'
import MapView, { Marker } from 'react-native-maps'

interface ChatState {
  messages: IMessage[]
}

export class Chat extends Component<{}, ChatState> {
  public constructor(props: {}) {
    super(props)
    this.state = {
      messages: [],
    }

    this.onSend = this.onSend.bind(this)
  }

  public componentWillMount(): void {
    const messages: IMessage[] = [
      {
        _id: Math.round(Math.random() * 1000000),
        text: '#awesome piece of shit',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        image:
          'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
        sent: true,
        received: true,
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Send me a picture!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
        sent: true,
        received: true,
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        sent: true,
        received: true,
        location: {
          latitude: 48.864601,
          longitude: 2.398704,
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Where are you?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Yes, and I use Gifted Chat!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        sent: true,
        received: true,
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Are you building a chat app?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'You are officially rocking GiftedChat.',
        createdAt: new Date(),
        system: true,
      },
    ] as IMessage[]

    this.setState({
      messages,
    })
  }

  public render(): React.ReactNode {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        renderCustomView={this.renderCustomView}
        user={{
          _id: 1,
        }}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: 'lightgreen' },
            onPress: (props: {}) => alert(`press on ${props}`),
          },
        ]}
      />
    )
  }

  private onSend(messages: IMessage[] = []): void {
    console.info(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  private renderCustomView = (props: {
    currentMessage: {
      location?: {
        latitude: number
        longitude: number
      } & IChatMessage
    }
    containerStyle: {}
  }) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
            // provider={'google'}
            style={[styles.mapView]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
              }}
            />
          </MapView>
        </View>
      )
    }
    return null
  }
}
const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
})
