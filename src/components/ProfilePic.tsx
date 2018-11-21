import * as React from 'react'
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class ProfilePic extends React.Component {
  public render() {
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
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
  },
})
