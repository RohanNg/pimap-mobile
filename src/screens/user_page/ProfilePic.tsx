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
import { User } from '../../datastore'

export const ProfilePic: React.SFC<{ user: User }> = ({
  user: {
    value: { firstname, lastname, profilePicture },
  },
}) => {
  return (
    <View>
      <View style={styles.profilepicWrap}>
        <Image
          style={styles.profilepic}
          source={
            profilePicture
              ? { uri: profilePicture }
              : require('../../resources/profile.jpg')
          }
        />
      </View>
      <Text style={styles.username}>
        {firstname} {lastname}
      </Text>
    </View>
  )
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

  username: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
  },
})
