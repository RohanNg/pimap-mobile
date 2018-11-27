import * as React from 'react'
import * as firebase from 'firebase'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { Title, TextInput, Chip, Button } from 'react-native-paper'
import { theme } from '../theme'

interface HobbyScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

const hobbyList = [
  'Gaming',
  'Art',
  'Music',
  'Political movement',
  'TV Show',
  'Adult',
  'Tech',
  'Science',
  'Sport',
  'Cultural',
  'Pet',
  'Nature',
  'Outdoor',
]

export class HobbyScreen extends React.Component<HobbyScreenProps> {
  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Title style={{ fontSize: 24 }}>Sign Up</Title>
        <Text style={{ marginTop: 10 }}>Step 2 / 2</Text>
        <Text style={styles.textHeader}>Tell us your interest</Text>
        <View style={styles.chip}>
          {hobbyList.map(item => {
            return (
              <Chip
                mode="outlined"
                style={styles.chipitem}
                onPress={() => {}}
                key={item}
              >
                {item}
              </Chip>
            )
          })}
        </View>

        <Button
          mode="contained"
          style={styles.buttonsignup}
          onPress={() => this.props.navigation.navigate('authenticatedApp')}
        >
          <Text style={styles.btnText}>I'M DONE!</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    marginTop: 30,
    marginBottom: 20,
  },
  textHeader: {
    marginTop: 5,
    color: '#F27979',
    fontWeight: '600',
    fontSize: 18,
  },
  chip: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  texttitle: {
    marginTop: 16,
  },

  error: {
    textAlign: 'center',
  },
  buttonsignup: {
    marginBottom: 30,
    marginTop: 40,
    height: 40,
    width: 140,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chipitem: {
    margin: 3,
    alignContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
})
