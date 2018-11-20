import * as React from 'react'
import {
  Alert,
  Button,
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'

export default class ProfilePic extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.profilepicWrap}>
          <Image
            style={styles.profilepic}
            source={require('../resources/profile.jpg')}
          />
        </View>
        <Text style={styles.nameuser}>Anh Nguyen Le</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profilepicWrap: {
    width: 154,
    height: 154,
    borderRadius: 77,
    borderColor: '#F27979',
    borderWidth: 7,
  },

  profilepic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: '#fff',
    borderWidth: 4,
  },

  nameuser: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
  },
})
